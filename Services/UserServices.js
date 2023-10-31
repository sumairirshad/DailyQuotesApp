import { child, get, ref, set } from "firebase/database";
import { auth, db } from "../Firebase";


async function toggleLike(quoteId) {
    const user = auth.currentUser;
    try {
        const dbRef = ref(db);
        const userRef = child(dbRef, `/Users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const currUser = snapshot.val();
            if (currUser.hasOwnProperty("likedQuotes")) {
                if (currUser.likedQuotes.includes(quoteId)) {
                    // Remove the quoteId from the likedQuotes array
                    currUser.likedQuotes = currUser.likedQuotes.filter(item => item !== quoteId);
                } else {
                    // Add the quoteId to the likedQuotes array
                    currUser.likedQuotes.push(quoteId);
                }
            }
            else currUser.likedQuotes = [quoteId];
            // Update the user's data
            await set(userRef, currUser);
        } else {
            const userData = { name: user.displayName, email: user.email, isAdmin: false, likedQuotes: [quoteId] };
            // Create a new user with likedQuotes array
            await set(userRef, userData);
        }
    } catch (error) {
        console.error(error);
    }
}

const isQuoteLikedByTheUser = async (quoteId) => {
    const user = auth.currentUser;
    try {
        const dbRef = ref(db);
        const userRef = child(dbRef, `/Users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const currUser = snapshot.val();

            if (currUser.hasOwnProperty("likedQuotes")) {
                if (currUser.likedQuotes.includes(quoteId)) {
                    return true;
                } else {
                    return false;
                }
            }

            else return false;

        } else {
            return false;
        }
    } catch (error) {
        console.error("Error checking like status:", error);
        return false;
    }
}

export { toggleLike, isQuoteLikedByTheUser }