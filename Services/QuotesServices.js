import { child, get, limitToLast, query, ref, endBefore, startAfter, orderByKey, orderByChild, limitToFirst, startAt, push, set } from "firebase/database";
import { auth, db } from "../Firebase";
// import GPT, { generateResponse } from "./ChatGPTService";
import { createCategory, mapCategoryIdsIntoCategoryObjects } from "./CategoriesServices";
import { createAuthor, getAuthorById } from "./AuthorServices";

const getAllQuotes = async (lastKey = null, getAll = false) => {
    try {
        const dbRef = ref(db);

        let qureyRef

        if (!getAll) {
            qureyRef = query(ref(db, '/Quotes'), orderByChild("timeStamp"), startAfter(lastKey), limitToFirst(4));
        }

        else {
            qureyRef = ref(db, '/Quotes');
        }

        const snapshot = await get(qureyRef);

        if (snapshot.exists()) {
            const quotes = Object.keys(snapshot.val()).map(async (key) => {
                const quoteData = snapshot.val()[key];
                const author = await getAuthorById(quoteData.authorId); // Fetch author details
                const categoryIds = quoteData.categories || [];
                // Fetch category details for each category ID
                const categoryPromises = categoryIds.map(async (categoryId) => {
                    const categorySnapshot = await get(child(dbRef, `/Categories/${categoryId.categoryId}`));
                    if (categorySnapshot.exists()) {
                        return ({
                            categoryId: categoryId.categoryId,
                            categoryName: categorySnapshot.val().name,
                        })
                    }
                    else return null;
                });

                const categoriesWithDetails = await Promise.all(categoryPromises);


                // If author is found, add authorName property to quote object and Combine category details with quote data
                if (author) {
                    return {
                        quoteId: key,
                        authorName: author.name, // Assuming you have name property in author data
                        ...quoteData,
                        categories: categoriesWithDetails,
                    };
                }

                return null;
            });

            // Wait for all the quotes to be fetched and resolved
            const resolvedQuotes = await Promise.all(quotes);

            // Filter out null values (quotes with unknown authors)
            const filteredQuotes = resolvedQuotes.filter((quote) => quote !== null);

            const sortedQuotes = filteredQuotes.sort((a, b) => a.timeStamp - b.timeStamp);

            return filteredQuotes;
        } else {
            console.log('No quotes found.');
            return [];
        }
    } catch (error) {
        console.error('Error getting quotes:', error);
        return [];
    }
};

const createQuote = async (quoteObj) => {
    try {
        const dbRef = ref(db, '/Quotes');
        const newQuoteRef = push(dbRef);
        await set(newQuoteRef, quoteObj);
        return {
            quote: {
                ...quoteObj,
                quoteId: newQuoteRef.key,
            }
        }
    } catch (error) {
        console.error('Error creating quote:', error);
        return false;
    }
};

const isQuotePresentInDailyQuotes = async (quoteId) => {
    try {
        const dbRef = ref(db, '/DailyQuotes');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const quotes = Object.keys(snapshot.val());
            return quotes.includes(quoteId);
        }

        return false;
    } catch (error) {
        console.error('Error checking quote presence', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

const createMoreQOTDs = async () => {
    const createdQuotes = [];
    try {
        const dbRef = ref(db, '/DailyQuotes');
        const allQuotes = await getAllQuotes(null, true);
        let counter = 0;

        while (counter < 10) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + counter);
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth(); // Months are 0-based, so January is 0
            let day = currentDate.getDate();

            let timestamp = new Date(year, month, day).getTime(); // Timestamp of midnight on the current day

            for (let i = allQuotes.length - 1; i >= 0 && counter < 10; i--) {
                const quote = allQuotes[i];
                const isPresent = await isQuotePresentInDailyQuotes(quote.quoteId);
                if (!isPresent) {
                    const quoteObj = { quoteId: quote.quoteId, dateFor: timestamp };
                    const newQuoteRef = push(dbRef);
                    await set(newQuoteRef, quoteObj);
                    createdQuotes.push({ dailyQuoteId: newQuoteRef.key, ...quoteObj });
                    counter++;
                    break;
                }
            }
        }

        return createdQuotes;
    } catch (error) {
        console.error('Error creating daily quotes', error);
        return false;
    }
}

const getQOTD = async () => {
    try {
        const dbRef = ref(db);
        const quoteRef = child(dbRef, `/DailyQuotes`);
        const snapshot = await get(quoteRef);

        if (snapshot.exists()) {
            const quotes = Object.keys(snapshot.val()).map((key) => ({
                dailyQuoteId: key,
                ...snapshot.val()[key]
            }));
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); // Months are 0-based, so January is 0
            const day = currentDate.getDate();
            const currentTimestamp = new Date(year, month, day).getTime();

            const tempQuote = quotes.find((quote) => quote.dateFor === currentTimestamp);
            if (tempQuote) {
                const todaysQuote = await getQuoteById(tempQuote.quoteId);
                return todaysQuote;
            }
            else {
                const quotes = await createMoreQOTDs();
                const todaysQuote = await getQuoteById(quotes[0].quoteId);
                return todaysQuote;
            }
        } else {
            const quotes = await createMoreQOTDs();
            const todaysQuote = await getQuoteById(quotes[0].quoteId);
            return todaysQuote;
        }
    } catch (error) {
        console.error(error);
    }
}

const getQuoteById = async (quoteId) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `/Quotes/${quoteId}`));

        if (snapshot.exists()) {
            const quoteData = snapshot.val();
            const author = await getAuthorById(quoteData.authorId); // Fetch author details

            const categoryIds = quoteData.categories || [];

            const categoryObjArray = await mapCategoryIdsIntoCategoryObjects(categoryIds);

            // If author is found, add authorName property to quote object and combine category details with quote data
            if (author) {
                return {
                    quoteId,
                    authorName: author.name, // Assuming you have a name property in the author data
                    ...quoteData,
                    categories: categoryObjArray, // Remove null values
                };
            } else {
                console.log('Author not found for quote:', quoteId);
                return null; // Handle the case where the author is not found
            }
        } else {
            console.log('Quote not found:', quoteId);
            return null; // Handle the case where the quote is not found
        }
    } catch (error) {
        console.error('Error getting quote:', error);
        return null; // Handle errors gracefully
    }
};

const getQuotesByAuthorId = async (authorId) => {
    try {
        const dbRef = ref(db, '/Quotes');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const documents = snapshot.val();
            const quotes = [];

            for (const documentId in documents) {
                if (documents.hasOwnProperty(documentId)) {
                    const document = documents[documentId];
                    if (document.authorId === authorId) {
                        quotes.push({
                            quoteId: documentId,
                            ...document
                        });
                    }
                }
            }

            return quotes;
        } else {
            console.error('Collection is empty.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching quotes by authorId:', error);
        return [];
    }
}

const getQuotesByCategoryId = async (categoryId) => {
    try {
        const dbRef = ref(db, '/Quotes');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const documents = snapshot.val();
            const quotes = [];

            for (const documentId in documents) {
                if (documents.hasOwnProperty(documentId)) {
                    const document = documents[documentId];
                    const matchingCategories = document.categories.filter(category => category.categoryId === categoryId);

                    if (matchingCategories.length > 0) {
                        const categoryIds = document.categories || [];

                        const categoryObjArray = await mapCategoryIdsIntoCategoryObjects(categoryIds);

                        const author = await getAuthorById(document.authorId);

                        quotes.push({
                            quoteId: documentId,
                            authorName: author.name,
                            ...document,
                            categories: categoryObjArray,
                        });
                    }
                }
            }
            return quotes;
        } else {
            console.error('Collection is empty.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching quotes by categoryId:', error);
        return [];
    }
}

const getAllLikedQuotes = async (lastKey = null) => {
    const user = auth.currentUser;
    try {

        let queryRef;

        if (lastKey === 0) return false;

        if (lastKey === null ) {
            queryRef = query(ref(db, `/Users/${user.uid}/likedQuotes`), orderByKey(), startAt('0'), limitToFirst(10));
        }
        
        else {
            queryRef = query(ref(db, `/Users/${user.uid}/likedQuotes`), orderByKey(), startAfter(lastKey.toString()), limitToFirst(10));
        }

        const snapshot = await get(queryRef)

        if (snapshot.exists()) {
            const snapshotData = snapshot.val();
            const likedQuotes = Object.values(snapshotData);

            if (likedQuotes.length > 0) {
                const quoteObj = []
                for (let i = 0; i < likedQuotes.length; i++) {
                    const quote = await getQuoteById(likedQuotes[i]);
                    quoteObj.push(quote);
                }
                return quoteObj;
            } else {
                return [];
            }

        } else {
            return [];
        }
    } catch (error) {
        console.error("Error getting liked quotes :", error);
        return [];
    }
}

// const CreateQuotesFromChatGpt = async (categories, authors, quotes, likedQuote, isLiked) => {
//     if (categories !== undefined && authors !== undefined && quotes !== undefined && isLiked) {
//         const categories = likedQuote.categories.map((category) => category.categoryName);

//         const categoryNames = categories.join(', ');

//         const res = await generateResponse(categoryNames);
//         const quoteArray = JSON.parse(res);

//         await storeChatGPTSuggestions(quoteArray, quotes, categories, authors );
//     }
// }

// const getSuggestedQuotes = async () => {
//     const fetchedQuotes = await getAllLikedQuotes();
//     const likedQuotes = fetchedQuotes.splice(-3);

//     if (likedQuotes.length > 0) {
//         const uniqueCategoryIdSet = new Set();
//         let suggestedQuotes = [];

//         for (let i = 0; i < likedQuotes.length; i++) {
//             const categories = likedQuotes[i].categoryIds || [];

//             for (let j = 0; j < categories.length; j++) {
//                 uniqueCategoryIdSet.add(categories[j]);
//             }
//         }

//         const uniqueCategoryIds = Array.from(uniqueCategoryIdSet);

//         for (let i = 0; i < uniqueCategoryIds.length; i++) {
//             const fetchedQuotes = (await getQuotesByCategoryId(uniqueCategoryIds[i])).splice(-1);

//             if (fetchedQuotes.length > 0) {
//                 // Sort fetchedQuotes by dateCreated or another relevant metric here if needed
//                 suggestedQuotes.push(fetchedQuotes[0]);
//             }
//         }

//         return suggestedQuotes
//     }

//     return [];
//     // }
// }

// const storeChatGPTSuggestions = async (quotes, allQuotes, categories, authors) => {
//     try {
//         if (quotes.length > 0) {
//             const suggestedQuotes = [];
//             for (let i = 0; i < quotes.length; i++) {
//                 const existingQuote = allQuotes.find(quote => quote.quote?.trim().toLowerCase() === quotes[i].quote?.trim().toLowerCase());
//                 if (!existingQuote) {
//                     let authorId;
//                     const categoryIdsArray = [];
//                     for (let j = 0; j < quotes[i].categories.length; j++) {
//                         const existingCategory = categories.find(c => c.name?.trim().toLowerCase() === quotes[i].categories[j]?.trim().toLowerCase());
//                         if (existingCategory) categoryIdsArray.push(existingCategory.categoryId);
//                         else {
//                             const categoryKey = await createCategory({
//                                 name: quotes[i].categories[j],
//                                 image: "",
//                                 dateCreated: new Date().toDateString(),
//                                 sequenceNumber: categories.length + 1,
//                                 timeStamp: -Date.now()
//                             })
//                             if (categoryKey) categoryIdsArray.push({categoryId: categoryKey});
//                         }
//                     }

//                     const existingAuthor = authors.find(a => a.name?.trim().toLowerCase() === quotes[i].author?.trim().toLowerCase());
//                     if (existingAuthor) {
//                         authorId = existingAuthor.authorId;
//                     }
//                     else {
//                         // Create a new author
//                         const authorKey = await createAuthor({
//                             name: quotes[i].author,
//                             image: "",
//                             dateCreated: new Date().toDateString(),
//                             sequenceNumber: authors.length + 1,
//                             timeStamp: -Date.now()
//                         })
//                         if (authorKey) {
//                             authorId = authorKey;
//                         }
//                     }
//                     const quoteObj = {
//                         quote: quotes[i].quote,
//                         image: "",
//                         authorId,
//                         categories: categoryIdsArray,
//                         dateCreated: new Date().toDateString(),
//                         timeStamp: -Date.now()
//                     };
//                     // console.log(quoteObj);
//                     const quoteData = await createQuote(quoteObj);
//                     suggestedQuotes.push(quoteData.quote);
//                 }
//             }
//             console.log("Quotes created successfully!");
//             return suggestedQuotes;

//         }
//     } catch (error) {
//         console.error("Error while creating suuggested quotes: " + error);
//     }
// }

export { getAllQuotes, getQuotesByAuthorId, getQuotesByCategoryId, getQuoteById, getQOTD, getAllLikedQuotes }