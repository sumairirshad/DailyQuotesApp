import { child, get, push, ref, set } from "firebase/database";
import { db } from "../Firebase";


const getAllAuthors = async () => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `/Authors`));
        if (snapshot.exists()) {
            const authors = Object.keys(snapshot.val()).map((key) => ({
                authorId: key,
                ...snapshot.val()[key]
            }));
            const updatedAuthors = ([...authors].sort((a, b) => a.sequenceNumber - b.sequenceNumber));
            return updatedAuthors;
        } else {
            console.log('No authors found.');
            return [];
        }
    } catch (error) {
        console.error('Error getting authors:', error);
        return [];
    }
};

const createAuthor = async (authorObj) => {
    try {
        const dbRef = ref(db, '/Authors');
        const newAuthorRef = push(dbRef);
        await set(newAuthorRef, authorObj);
        return newAuthorRef.key;
    } catch (error) {
        console.error('Error creating author:', error);
        return false;
    }
};

const getAuthorById = async (id) => {
    try {
        const dbRef = ref(db);
        const authorSnapshot = await get(child(dbRef, `/Authors/${id}`));
        if (authorSnapshot.exists()) {
            const authorData = authorSnapshot.val();
            return authorData;
        } else {
            console.log('Author not found, id: ', id);
            return null;
        }
    } catch (error) {
        console.error('Error fetching author:', error);
        return null;
    }
};

export { getAllAuthors, getAuthorById, createAuthor };