<template>
<div class="custom-datatable-container">
    <table class="table-style">
        <thead>
            <tr>
                <th v-for="header in tableDataConfig.headers">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="report_data.length <= 0 || report_data == undefined ">
                <td :colspan="tableDataConfig.column_count()" style="text-align: center;">
                   No {{ tableDataConfig.data_table_title }} available
                </td>
            </tr>
            <tr v-for="(data, index) in report_data">
                <td v-for="key in tableDataConfig.columns">
                    {{ key(data) }}
                </td>
            </tr>
        </tbody>
    </table>
    <div class="pagination-block">
    </div>
</div>
</template>

<script setup>

import { ref, reactive, watch } from "vue"
import { executeHash } from '../helpers/helpers.service.js'

const props = defineProps({
  tableDataConfig: Object,
});

const report_data = ref([])
const pagination_data = reactive({})
const report_data_length = ref(0)
const operation_hash = ref('')

operation_hash.value = props.tableDataConfig.operation_hash

async function test() {
    await props.tableDataConfig.data_source()
    .then(res => {

        report_data_length.value = res.length

        console.log(`report_data_length.value: ${report_data_length.value}`)

        if(report_data_length.value > 0) {

            report_data.value = res

            console.log(report_data.value)

            pagination_data.totalItems = report_data_length.value

            // pagination_data = {
            //     totalItems: report_data_length.value,
            //     currentPage: self.search.currentPage,
            //     rowCount: self.search.limit,
            //     maxPages: self.$scope.componentData.cdtConfig.page_number_count
            // };

            
            operation_hash.value = executeHash()
            console.log(`if true branch\noperation_hash.value: ${operation_hash.value}`)

        } else {
            report_data_length.value = 0;
            pagination_data = {};
            
            operation_hash.value = executeHash()
        }
    })
}

// report_data.value = await test()

await test()

console.log(`outside operation_hash.value: ${operation_hash.value}`)

// pagination logic

let search_details = {};

// $scope.$watch('componentData["operation_hash"]', function (newValue, oldValue, $scope) {

//     //console.log(`operation_hash new_value: ${newValue}`);
//     //console.log(`operation_hash old_value: ${oldValue}`);

//     assignTplData();

//     if(newValue != oldValue) {
//         doCoreTasks();
//     }
// })

watch(operation_hash, (newValue, oldValue) => {

  if (newValue != oldValue) {
    console.log('value is not the same')
  }
})

function doCoreTasks() {
    search_details = $scope.componentData.search_details;
    pagination_data = $scope.componentData.pagination_data;
    if(pagination_data.totalItems > 0) {
        pagination_data = paginate(pagination_data.totalItems, pagination_data.currentPage, pagination_data.rowCount, pagination_data.maxPages);
        renderPagination(pagination_data);
    } else {
        wipePageNaviContents();
    }
}

function paginate(totalItems, currentPage, rowCount, maxPages) {
    // calculate total pages

    totalItems = totalItems !=undefined ? parseFloat(totalItems) : 0;
    rowCount = rowCount != undefined ? parseFloat(rowCount) : 0;

    let totalPages = Math.ceil(totalItems / rowCount);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage = 0;
    let endPage = 0;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * rowCount;
    let endIndex = Math.min(startIndex + rowCount - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        rowCount: rowCount,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}

function insertDotsToArray(currentPage, totalPages) {
    let current = currentPage,
        last = totalPages,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

function redetermineCurrentPage(aId, divId) {
    const currentSelectedPageNoLink = document.querySelector('.current-page-number-color');
    currentSelectedPageNoLink.classList.remove('current-page-number-color');
    const currentSelectedPageNoDiv = document.querySelector('.current-page-number-bg');
    currentSelectedPageNoDiv.classList.remove('current-page-number-bg');

    const nPageLink = document.getElementById(aId);
    nPageLink.classList.add('current-page-number-color');
    const nPageDiv = document.getElementById(divId);
    nPageDiv.classList.add('current-page-number-bg');
}

function wordPageButton(wordNaviObj) {

    const wordBtnDiv = document.createElement('div');
    wordBtnDiv.innerHTML = wordNaviObj.word;

    wordBtnDiv.setAttribute('id', (wordNaviObj.word).toLowerCase());
    wordBtnDiv.classList.add('navi-item-hover');

    if(wordNaviObj.currentPage > 1) {

        wordBtnDiv.addEventListener('click', function() {

            if(
                $scope.cdtConfig &&
                $scope.cdtConfig.data_source &&
                typeof $scope.cdtConfig.data_source === 'function'
            ) {
                switch (wordNaviObj.word) {

                    case 'First':

                        search_details.offset = 0;

                        redetermineCurrentPage('page-no-link-1', 'page-no-1');

                        //set the target page number
                        search_details.currentPage = 1;

                        $scope.cdtConfig.data_source(search_details);
                        break;

                    case 'Previous':

                        search_details.offset = wordNaviObj.offset - wordNaviObj.rowCount;

                        redetermineCurrentPage(`page-no-link-${wordNaviObj.currentPage - 1}`, `page-no-${wordNaviObj.currentPage - 1}`);

                        //set the target page number
                        search_details.currentPage = wordNaviObj.currentPage - 1;

                        $scope.cdtConfig.data_source(search_details);
                        break;

                    default: break;
                    }
            }
        });
    }

    if(wordNaviObj.currentPage < wordNaviObj.totalPages) {

        wordBtnDiv.addEventListener('click', function() {

            if(
                $scope.cdtConfig &&
                $scope.cdtConfig.data_source &&
                typeof $scope.cdtConfig.data_source === 'function'
            ) {

                switch (wordNaviObj.word) {

                    case 'Next':

                        //search_details.offset = (wordNaviObj.currentPage * wordNaviObj.rowCount) + wordNaviObj.rowCount;
                        search_details.offset = wordNaviObj.currentPage * wordNaviObj.rowCount;

                        redetermineCurrentPage(`page-no-link-${wordNaviObj.currentPage + 1}`, `page-no-${wordNaviObj.currentPage + 1}`);

                        //set the target page number
                        search_details.currentPage = wordNaviObj.currentPage + 1;

                        $scope.cdtConfig.data_source(search_details);
                        break;

                    case 'Last':

                        search_details.offset = (wordNaviObj.totalPages * wordNaviObj.rowCount) - wordNaviObj.rowCount;

                        redetermineCurrentPage(`page-no-link-${wordNaviObj.totalPages}`, `page-no-${wordNaviObj.totalPages}`);

                        //set the target page number
                        search_details.currentPage = angular.copy(wordNaviObj.totalPages);

                        $scope.cdtConfig.data_source(search_details);
                        break;
                    default: break;
                }
            }
        });
    }


    wordNaviObj.group.appendChild(wordBtnDiv);
}

//for refactor
function renderPagination(paginationData) {

    wipePageNaviContents();
    let paginationBlock = document.querySelector('.pagination-block');

    const displayInfo = document.createElement('div');
    displayInfo.classList.add('display-info');
    displayInfo.innerHTML = `Showing ${paginationData.startIndex+1} to ${paginationData.endIndex+1} of ${paginationData.totalItems} entries`;
    paginationBlock.appendChild(displayInfo);

    const naviGroup = document.createElement('div');
    naviGroup.classList.add('page-navi-group');
    paginationBlock.appendChild(naviGroup);

    const pageNumberGroup = document.createElement('div');
    pageNumberGroup.classList.add('page-number-group');

    const pageNosArray = paginationData.pages;

    const dots = '...';
    const deductedLength = pageNosArray.length-1;

    const pageNosWithDotsArray = insertDotsToArray(paginationData.currentPage, paginationData.totalPages);

    pageNosWithDotsArray.forEach((element) => {

        const pageNumberLink = document.createElement('a');
        pageNumberLink.innerHTML = element;
        if(element != '...') {
            pageNumberLink.setAttribute('id', 'page-no-link-' + element);
        }

        const pageNumberDiv = document.createElement('div');

        if(element == paginationData.currentPage) {

            pageNumberDiv.setAttribute('id', 'page-no-' + element);
            pageNumberLink.classList.add('current-page-number-color');
            pageNumberDiv.classList.add('current-page-number-bg');

        } else {
            if(element != '...') {
                pageNumberDiv.setAttribute('id', 'page-no-' + element);
                pageNumberDiv.classList.add('navi-item-hover');

                pageNumberDiv.addEventListener('click', function() {

                    if(
                        $scope.cdtConfig &&
                        $scope.cdtConfig.data_source &&
                        typeof $scope.cdtConfig.data_source === 'function'
                    ) {
                        search_details.offset = (element * paginationData.rowCount) - paginationData.rowCount;
                        search_details.currentPage = element;
                        $scope.cdtConfig.data_source(search_details);
                    }
                });
            }
        }

        pageNumberDiv.appendChild(pageNumberLink);
        pageNumberGroup.appendChild(pageNumberDiv);

    });

    wordPageButton({
        group: naviGroup,
        word: 'First',
        offset: 0,
        startIndex: paginationData.startIndex,
        currentPage: paginationData.currentPage,
        rowCount: paginationData.rowCount,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems
    });

    wordPageButton({
        group: naviGroup,
        word: 'Previous',
        offset: search_details.offset,
        startIndex: paginationData.startIndex,
        currentPage: paginationData.currentPage,
        rowCount: paginationData.rowCount,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems
    });

    // add the page numbers group
    naviGroup.appendChild(pageNumberGroup);

    wordPageButton({
        group: naviGroup,
        word: 'Next',
        offset: search_details.offset,
        startIndex: paginationData.startIndex,
        currentPage: paginationData.currentPage,
        rowCount: paginationData.rowCount,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems
    });

    wordPageButton({
        group: naviGroup,
        word: 'Last',
        offset: search_details.offset,
        startIndex: paginationData.startIndex,
        currentPage: paginationData.currentPage,
        rowCount: paginationData.rowCount,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems
    });
}

function wipePageNaviContents() {
    let element = document.querySelector('.pagination-block');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
} 

</script>

<style>
    .custom-datatable-container {
        display: flex;
        flex-direction: column;
    }

    .pagination-block {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(88, 88, 88, .3);
        padding: 0.1rem 0.5rem;
    }

    .display-info {
        margin-left: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #585858;
    }

    .page-navi-group, .page-number-group {
        display: flex;
        align-items: center;
    }

    .page-navi-group div, .page-number-group div {
        box-sizing: border-box;
        display: inline-block;
        min-width: 1.5em;
        padding: 0.2rem 0.6rem;
        margin-left: 2px;
        text-align: center;
        text-decoration: none !important;
        cursor: pointer;
        color: #333;
        border: 1px solid transparent;
        border-radius: 2px;
    }

    /* .page-navi-group > div:hover:not(:nth-child(3n)),
    .page-number-group > div:hover:not(:nth-last-child(2)) {
        background-color: #5accbd;
        color: #fff;
    } */

    .navi-item-hover:hover {
        background-color: #5accbd;
        color: #fff;
    }

    .current-page-number-bg {
        background-color: #009688;
    }

    .current-page-number-color {
        color: #fff;
    }

    .form-input-flex {
  display: flex;  
}

.table-style {
  color: #fff;
}

.cselect-style {
  width: 12.5rem;
}

@media screen and (max-width: 700px) {

  #main-form select {
    width: 86vw;
  }

  .table-style {
    margin: 0;
    width: 100%;
  }

  table thead {
    display: none;
  }

  table td {
    display: flex;
  }

  #main-form select, table td {
      font-size: 1.5rem;
  }
  
  tbody td::before {
    content: attr(data-label);
    color: #000;
    text-shadow: 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005;
    font-weight: bold;
    width: 7.5rem;
    min-width: 7.5rem;
    margin-right: 1rem;
  }
  
}
</style>