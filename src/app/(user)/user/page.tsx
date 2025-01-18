import { url } from "@/utils"
import UserClient from "./UserClient";

export const getPinnedArticles = (user_email:any) => {
    return fetch(`${url}/api/pinArticle/get`, { 
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ user_email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .catch(error => {
        console.error('Error sending data:', error);
    });
}

export default function UserPage() {
    return(
        <div>
            <UserClient/>
        </div>
    )
}