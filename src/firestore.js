import { db } from './firebase.js';
import { doc, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const getUserProfile = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;  // Handle non-existing document appropriately
    }
};

export const updateUserWallet = async (userId, newWalletAmount) => {
    const userRef = doc(db, "users", userId);
    return await updateDoc(userRef, {
        wallet: newWalletAmount
    });
};

export const updateStockHoldings = async (userId, stockSymbol, quantity, newWalletAmount, transactionType) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        let userProfile = docSnap.data();

        // Update or initialize stock holding
        const stocks = userProfile.stocks || [];
        const existingStock = stocks.find(stock => stock.symbol === stockSymbol);

        if (existingStock) {
            if (transactionType === 'buy') {
                existingStock.quantity += quantity;
            } else if (transactionType === 'sell') {
                existingStock.quantity -= quantity;
                if (existingStock.quantity <= 0) {
                    userProfile.stocks = stocks.filter(stock => stock.symbol !== stockSymbol);
                }
            }
        } else if (transactionType === 'buy') {
            userProfile.stocks.push({ symbol: stockSymbol, quantity });
        }

        // Update wallet balance
        await updateDoc(userRef, {
            stocks: userProfile.stocks,
            wallet: newWalletAmount
        });
    } else {
        console.log("No such user profile!");
    }
};
// Add more Firestore functions as needed
