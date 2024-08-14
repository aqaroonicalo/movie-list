import { useEffect, useMemo, useRef } from "react"
import { searchStore } from "./App";
import './Search.css'

export function Search () {
    const inputRef = useRef(null)
    let currSearchTerm = searchStore((state) => state.searchTerm)
    const setnewSearch = searchStore((state) => state.setTerm)

   const throttledFunc = useMemo(function throttle() {
        // ADD CODE HERE
        let timerFlag = null; // Variable to keep track of the timer

        // Returning a throttled version 
        return () => {
            clearTimeout(timerFlag) // If there is no timer currently running
             // Execute the main function 
            timerFlag = setTimeout(() => {
                handleinput(); // Set a timer to clear the timerFlag after the specified delay
                // timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
            }, 1000);
            }
        }
        // let timeout;
        // let bool = true;
        // return function () {
        //   if (timeout) {
        //     clearTimeout(timeout)
        //   }
        //   timeout = setTimeout(() => bool = true, 1000);
        //   if (!bool) {
        //     return
        //   }
            
        //   bool = false
        //   return handleinput();
        // }
        , []);

    function handleinput () {
        console.log(inputRef.current.value)
        setnewSearch(inputRef.current.value)
        console.log("Search term is now " + currSearchTerm)
    }
    return <>
    <div class="form__group field">
            <input type="input" class="form__field" placeholder="Name" name="name" id='name' ref={inputRef} onChange={throttledFunc} required />
            <label for="name" class="form__label">Name</label>
    </div>
    </>
}