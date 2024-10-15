<script>
  import { onMount } from "svelte";

  let dateTime = "";

  // Function to update the current time and date
  const updateTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const date = now.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    dateTime = `${date} ${time}`; // Combine date and time into one string
  };

  // Update time every second after component mounts
  onMount(() => {
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update time every second

    return () => {
      clearInterval(interval); // Cleanup the interval when component is destroyed
    };
  });
</script>

<style>
  .clock {
    font-family: Arial, sans-serif;
    font-size: 1rem;
    font-weight: bold;
    color: #66aa66;
    white-space: nowrap; /* Prevent wrapping */
    margin-top: 16px;
    border: 1px solid #66aa66;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
  }
</style>

<div class="clock">{dateTime}</div>
