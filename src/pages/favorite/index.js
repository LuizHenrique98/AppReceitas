import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';

import {useIsFocused} from '@react-navigation/native'

import {getFavorites} from '../../utils/storage'
import {FoodList }  from '../../components/foodList'

export function Favorite(){
    const [receipes, setReceipes] = useState([]);
    const [isFocused, setIsfocused] = useState();

    useEffect(() => {
        let isActive = true;    

        async function getReceipes(){
            const result = await getFavorites('@appreceitas')
            if(isActive){
                setReceipes(result);
            }
        }

        if(isActive){
            getReceipes();
        }

        return () => {
            isActive = false;
        }
    }, [isFocused])

    return(
        <View style={styles.container}>
            <Text style={styles.title} >Receitas Favoritas</Text>

            {receipes.length === 0 && (
                <Text>Nenhuma receita favoritada</Text>
            )}

            <FlatList
              showsVerticalScrollIndicator={false}
              style={{marginTop: 14}}
              data={receipes}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item}) => <FoodList data={item} /> }
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 36
    },
    title: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: 24
    }
})