import { db } from "../Firebase";
import { child, get, push, ref, set } from 'firebase/database'


const getAllCategories = async () => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `/Categories`));
        if (snapshot.exists()) {
            const categories = Object.keys(snapshot.val()).map((key) => ({
                categoryId: key,
                ...snapshot.val()[key]
            }));
            const updatedCategories = ([...categories].sort((a, b) => a.sequenceNumber - b.sequenceNumber));

            return updatedCategories;
        } else {
            console.log('No categories found.');
            return [];
        }
    } catch (error) {
        console.error('Error getting categories:', error);
        return [];
    }
};

const createCategory = async (categoryObj) => {
    try {
        const dbRef = ref(db, '/Categories');
        const newCategoryRef = push(dbRef);
        await set(newCategoryRef, categoryObj);
        return newCategoryRef.key;
    } catch (error) {
        console.error('Error creating category:', error);
        return false;
    }
};

const mapCategoryIdsIntoCategoryObjects = async (categoryIdArray) => {
    if (categoryIdArray.length > 0) {
        try {
            const dbRef = ref(db);
            const categoryPromises = categoryIdArray.map(async (category) => {
                const categorySnapshot = await get(child(dbRef, `/Categories/${category.categoryId}`));
                if (categorySnapshot.exists()) {
                    return ({
                        categoryId: category.categoryId,
                        categoryName: categorySnapshot.val().name,
                    })
                }
                else return null;
            });

            const categoriesWithDetails = await Promise.all(categoryPromises);
            return categoriesWithDetails.filter(Boolean);
        } catch (error) {
            console.error("Error Mapping Categories: ", error);
        }
    }
}

export { getAllCategories, createCategory, mapCategoryIdsIntoCategoryObjects };