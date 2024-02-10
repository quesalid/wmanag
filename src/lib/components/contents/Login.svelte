<script lang="ts">
  //import Modal  from "./modal/Modal.svelte"
   import { navigate } from "svelte-routing";
   import {token,user,role,navigation,getArrayFromPath} from "../../ustore.js"

  let usrid = "";
  let password = "";

  let isLoading = false;

  let isSuccess = false;

  export let color = "Teal"
  export let bgcolor = "white"
  export let fixcolor = "Teal"
  export let extsubmit:any;
  export let type = "UP2DATA"

  export let image = 'ICO_UP2_DATA.png'
  export let landingPage = '/data'
  export let scale = "100%"

  export let errors:any = {};


  export let openModalButton:any
 
 
  const toMainPage = ()=>{
	navigate(`/`)
  }

  const handleSubmit = async () => {
    errors = {}

    //console.log(errors)

    if (usrid.length === 0) {
      errors['usrid'] = "Field should not be empty";
    }
    if (password.length === 0) {
      errors['password'] = "Field should not be empty";
    }

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      //await submit({ usrid, password })
     extsubmit({ usrid, password })
        .then((res:any) => {
          isSuccess = true;
          isLoading = false;
          if(res.authenticated){
           navigate(landingPage)
           // UPDATE navigation
           $navigation = getArrayFromPath(landingPage)
           console.log("LOGIN",$navigation)
          }
            else{
              //$cpreason = "first login"
              navigate(`/data/admin/changepasswd`)
            }
        })
        .catch((err:any) => {
          isLoading = true;
          switch(err.code){
              case "ERR_PASSWD_EXPIRED":
                //$cpreason = "password expired"
                //$userid = usrid
                navigate(`/data/admin/changepasswd`)
                break;
            case "ERR_PASSWD_BLOCKED":
                errors['1'] = err.code
                errors['2'] = "contact system admin"
                errors['link'] = "mailto:amdin@google.com?subject:Blocked%20Password"
                openModalButton.click()
                break;
              default:
                 errors['server'] = err.code;
                openModalButton.click()
                break;
          }
        });
    }else{
        openModalButton.click()
    }
  };

  
</script>


<div class ="class-login-form">
    <form on:submit|preventDefault={handleSubmit}>
         <input type="image" src={image} alt="Submit"  style = 'margin-bottom: 20px;width:60%;' on:click={toMainPage}/>"

        <label for="usrid" style = '--color:{fixcolor}'>Userid</label>
        <input name="usrid" placeholder="name@example.com" bind:value={usrid} style = '--color:{fixcolor}'/>

        <label for="password" style = '--color:{fixcolor}'>Password</label>
        <input name="password" type="password" bind:value={password} style = '--color:{fixcolor}'/>

        <input name="type" bind:value={type} style = 'visibility: hidden;'/>

        <button type="submit" style = '--color:{color}; --background-color:{bgcolor}'>
          {#if isLoading}Logging in...{:else}Log in 🔒{/if}
        </button>

    </form>
</div>

<style>
div.class-login-form{
      position: absolute;
      width: 100%;
      display:flex;
      justify-content: space-around;
      margin-top: 4em;
  }
  form {
    background: #fff;
    padding: 50px;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 4px;
  }

  label {
    margin: 10px 0;
    align-self: flex-start;
    font-weight: 500;
    color: var(--color)
  }

  input {
    border: none;
    border-bottom: 1px solid var(--color);
    margin-bottom: 20px;
    transition: all 300ms ease-in-out;
    width: 100%;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #666;
  }

  button {
    margin-top: 20px;
    background: var(--color);
    color: var(--background-color);
    padding: 10px 0;
    width: 200px;
    border-radius: 25px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  button:hover {
    transform: translateY(-2.5px);
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
  }

  
</style>