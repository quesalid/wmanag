<script lang="ts">
   // EXTERNAL
   import { navigate } from "svelte-routing";
   import {onMount} from "svelte"
   // STORE
   import {token, user, role,mock,avatar,navigation,getArrayFromPath,module,avatargroups,family} from "../../ustore.js"
   // API
   import {login,decodeToken,getAvatar,getProfile,initMockDB} from '../../script/apisecurity.js'
   import {init} from '../../script/apidataconfig.js'
   // UTILS
   import {getMenuGroups} from '../../script/utils.js'
   // COMPONRNTS
   import WManag from '../WManag.svelte'
 
   
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
  export let modulename = 'data'
  export let scale = "100%"
  export let errors:any = {};


  export let openModalButton:any

  let array_of_errors:any = []
 
  onMount(async () => {
      // ON LOAD CLEAN STORE
      $role = ''
      $user = {username:'',uid:'',name:'',surname:'',profile:{language:'',locale:'',dashboard:[],map:{center:{lat:0,lng:0},zoom:1}}}
      $token = ''
      $avatar = ''
      $family = 'INDUSTRY'

  })

  const toMainPage = ()=>{
	navigate(`/`)
  }

  const handleSubmit = async () => {
    const modal:any = document.getElementById("login-dialog-id")
    errors = {}
    if (usrid.length === 0) {
      errors['usrid'] = "Userid must not be empty";
    }
    if (password.length === 0) {
      errors['password'] = "Password must not be empty";
    }

    const radios:any = document.getElementsByClassName("family-radio")
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            $family = radios[i].value;       
        }
    }
   
    if (Object.keys(errors).length === 0) {
      isLoading = true;
      //await submit({ usrid, password })
     extsubmit({ usrid, password})
        .then(async (res:any) => {
            const restoken = await login(usrid,password,$mock)
            isSuccess = true;
            isLoading = false;
            // 0. SET MOCKDB FAMILY (only for showroom)
            if($mock){
                initMockDB($family)
                init($family,$mock)
            }
            const decoded = await  decodeToken(restoken,$mock)
            // A. SET MODULE NAME IN STORE
            $module = modulename
            // B. SET USER,ROLE AND TOKEN IN STORE
            $token = restoken
            // C. GET USER PROFILE
            const profile =  await getProfile(decoded.token.uuid,$mock)
           
            // D. SET USER IN STORE
            $user = { username: 
                decoded.token.sub, 
                uid: decoded.token.uuid,
                name: decoded.token.name, 
                surname: decoded.token.surname,
                profile:profile };
            $role = decoded.token.auth
            // E. SET AVATAR GROUPS IN STORE
            $avatargroups = getMenuGroups($role,$module.toUpperCase())
            // F. SET AVATAR IN STORE
            $avatar = await getAvatar($user.uid,$mock)
            navigate(landingPage)
            // UPDATE navigation
            $navigation = getArrayFromPath(landingPage)
        })
        .catch((err:any) => {
           array_of_errors= []
          isLoading = true;
          switch(err){
              case "ERR_PASSWD_EXPIRED":
                    //$cpreason = "password expired"
                    //$userid = usrid
                    navigate(`/data/admin/changepasswd`)
                    break;
                case "ERR_PASSWD_BLOCKED":
                    array_of_errors.push(err)
                    array_of_errors.push("contact system admin")
                    array_of_errors.push("mailto:amdin@google.com?subject:Blocked%20Password")
                    // TBD - ADD ERROR MANAGEMENT
                    break;
                case 'BAD_CREDENTIAL_ERROR':
                    array_of_errors.push(err)
                    break;
                default:
                    array_of_errors.push(err);
                    break;
          }
           console.log(err)
           modal.style.display = 'block'
        });
    }else{
          array_of_errors= []
         const keys = Object.keys(errors)
         for(let i=0;i<keys.length;i++)
            array_of_errors.push(errors[keys[i]])
         modal.style.display = 'block'
    }
  };

  const closeModal = (ev:any) =>{
	 const divCont = document.getElementById("login-dialog-id")
	 if(divCont)
		divCont.style.display = 'none'
 }

 const title = 'Login Error'
 let  wbgcolor = "#ddefde"
 let toolbar:any = []

</script>


<div class ="class-login-form">
    <form on:submit|preventDefault={handleSubmit}>
         <input type="image" src={image} alt="Submit"  style = 'margin-bottom: 20px;width:60%;' on:click={toMainPage}/>"

        <label for="usrid" style = '--color:{fixcolor}'>Userid</label>
        <input name="usrid" placeholder="name@example.com" bind:value={usrid} style = '--color:{fixcolor}'/>

        <label for="password" style = '--color:{fixcolor}'>Password</label>
        <input name="password" type="password" bind:value={password} style = '--color:{fixcolor}'/>

        {#if modulename == 'clone'}
          <fieldset class="family-div">
              {#if $family == 'INDUSTRY'}
                  <input checked class="family-radio"  type="radio" id="familiy-industry" name="family" value="INDUSTRY">
                  <label style = '--color:{fixcolor}' for="family-industry">INDUSTRY</label><br>
                  <input class="family-radio" type="radio" id="family_utility" name="family" value="UTILITY">
                  <label style = '--color:{fixcolor}' for="family_utility">UTILITY</label><br>
             {:else}
                  <input class="family-radio"  type="radio" id="familiy-industry" name="family" value="INDUSTRY">
                  <label style = '--color:{fixcolor}' for="family-industry">INDUSTRY</label><br>
                  <input checked class="family-radio" type="radio" id="family_utility" name="family" value="UTILITY">
                  <label style = '--color:{fixcolor}' for="family_utility">UTILITY</label><br>
             {/if}
         </fieldset>
         {:else if modulename == 'data'}
         <fieldset class="family-div">
                {#if $family == 'PLANT'}
                  <input checked class="family-radio"  type="radio" id="familiy-industry" name="family" value="PLANT">
                  <label style = '--color:{fixcolor}' for="family-industry">PLANT</label><br>
                  <input class="family-radio" type="radio" id="family_utility" name="family" value="INFR">
                  <label style = '--color:{fixcolor}' for="family_utility">INFR</label><br>
             {:else}
                  <input class="family-radio"  type="radio" id="familiy-industry" name="family" value="PLANT">
                  <label style = '--color:{fixcolor}' for="family-industry">PLANT</label><br>
                  <input checked class="family-radio" type="radio" id="family_utility" name="family" value="INFR">
                  <label style = '--color:{fixcolor}' for="family_utility">INFR</label><br>
             {/if}
              </fieldset>
        {/if}

        <button type="submit" style = '--color:{color}; --background-color:{bgcolor}'>
          {#if isLoading}Logging in...{:else}Log in 🔒{/if}
        </button>

    </form>
</div>

<div class="modal" id="login-dialog-id" style="--background-color:{bgcolor}">
    <WManag id="DonutClickedWindow"
		closeMenu={closeModal}
		title="{title}" 
		disableClose={false} 
		draggable={false} 
		headercolor={wbgcolor}
		width="800px"
		top="10%"
		left="20%"
		toolbar = {toolbar}
		minimized="off"
		resize='both'>
		<div class="logerr-content-div" slot="bodycontent">
			{#each array_of_errors as Err}
                <div>{Err}</div>
            {/each}
        </div>
	</WManag>
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

  .family-div {
      display: flex;
  }

  .family-radio{
      vertical-align: middle; 
      margin: 0px;
  }

  .modal{
  display: none;
  position: absolute; /* Stay in place */
  top:0px;
  z-index: 999; /* Sit on top */
  padding: 4%; /* Location of the box */
  width: 100%; /* Full width */
  min-width: 200px; /* Full width */
  height: 100%; /* Full height */
  background-color: var(--background-color);
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.logerr-content-div{
    display:flexbox;
    justify-content:center ;
    text-align: center;
    height: 200px;
    margin-top: 20px;
    font-size:large;
}
  
</style>