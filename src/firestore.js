import { db } from './firebase.js';
import { doc, getDoc, updateDoc, setDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';

export const getUserProfile = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

export const updateUserWallet = async (userId, newWalletAmount) => {
    const userRef = doc(db, "users", userId);
    return await updateDoc(userRef, {
        wallet: newWalletAmount
    });
};

export const updateStockHoldings = async (userId, stockSymbol, quantity, newWalletAmount, transactionType, pricePerShare) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const userProfile = docSnap.data();
        const stocks = userProfile.stocks || [];
        const existingStock = stocks.find(stock => stock.symbol === stockSymbol);

        if (existingStock) {
            existingStock.quantity += (transactionType === 'buy' ? quantity : -quantity);
            if (existingStock.quantity <= 0) {
                userProfile.stocks = stocks.filter(stock => stock.symbol !== stockSymbol);
            }
        } else if (transactionType === 'buy') {
            userProfile.stocks.push({ symbol: stockSymbol, quantity });
        }

        const transaction = {
            type: transactionType,
            stockSymbol: stockSymbol,
            quantity: quantity,
            pricePerShare: pricePerShare,
            timestamp: new Date()
        };

        await updateDoc(userRef, {
            stocks: userProfile.stocks,
            wallet: newWalletAmount,
            transactions: arrayUnion(transaction)
        });
    } else {
        console.log("No such user profile!");
    }
};
