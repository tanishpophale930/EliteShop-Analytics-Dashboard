import React from 'react'
import "./MessagesButton.css"

const MessagesButton = () => {
  return (
    <div> 
        <button class="button">
            <svg class="svg-icon" fill="none"  viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-width="1.5"><path d="m6.66669 6.66667h6.66671"></path><path clip-rule="evenodd" d="m3.33331 5.00001c0-.92047.74619-1.66667 1.66667-1.66667h10.00002c.9205 0 1.6666.7462 1.6666 1.66667v6.66669c0 .9205-.7461 1.6666-1.6666 1.6666h-4.8274c-.1105 0-.21654.044-.29462.122l-2.50004 2.5c-.26249.2625-.71129.0766-.71129-.2945v-1.9108c0-.2301-.18655-.4167-.41667-.4167h-1.25c-.92048 0-1.66667-.7461-1.66667-1.6666z" fill-rule="evenodd"></path><path d="m6.66669 10h2.5"></path></g></svg>
        </button>
    </div>
  )
}

export default MessagesButton