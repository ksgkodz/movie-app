const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID



export const updateSearchCount = async () => {
    console.log(PROJECT_ID,COLLECTION_ID,DATABASE_ID);
}