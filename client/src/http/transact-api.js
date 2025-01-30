import api from "./api";
import { toast } from 'bulma-toast'

const apiPath = import.meta.env.VITE_API_PATH

const resource = `${apiPath}/`;

export const createTransaction = async (route, payload) => {

    const res = confirm(`Are you sure to save this ${payload.transaction} entry?`);

    console.log(resource, route);
  
    if (res) {
  
      console.log('YES')
      
      await api.post(`${resource}${route}`, payload)
      .then(response => {
  
        toast({
          message: `[${payload.account_type}] New ${payload.transaction} successfully posted to database`,
          duration: 3000,
          type: 'is-warning',
          position: "top-center",
          dismissible: true,
          pauseOnHover: true,
          closeOnClick: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  
    } else {
      console.log('NO');
    }
  
    return res;
  }