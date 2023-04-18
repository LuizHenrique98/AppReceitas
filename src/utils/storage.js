import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function saveFavorite(key, newItem){
    let myFavorites = await getFavorites(key)

    let hasItem = myFavorites.some(item => {item.id === newItem.id})

    if (hasItem){        
        return;
    }

    myFavorites.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites))        
}

export async function removeFavorite(id){
    let receipes = await getFavorites("@appreceitas")

    let myFavorites = receipes.filter(item => {
        return(item.id !== id)
    })

    await AsyncStorage.setItem("@appreceitas", JSON.stringify(myFavorites))        
    return myFavorites
}

export async function isFavorite(receipe){
    let myReceipes = await getFavorites('@appreceitas')

    const favorite = myReceipes.find(item => item.id === receipe.id)    
    
    if (favorite){
        return true;
    }
    return false;

}