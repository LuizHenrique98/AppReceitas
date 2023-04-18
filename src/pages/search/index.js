import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import {useRoute} from '@react-navigation/native'

import api from '../../services/api';

import {FoodList} from '../../components/foodList'

export function Search(){    
    const route = useRoute();
    const [receipes, setReceipes] = useState([])

    useEffect(() => {
        async function fetchReceipes(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data)
        }

        fetchReceipes();
    }, [route.params?.name])

    return(
        <View style={styles.container}>
              <FlatList
              ListEmptyComponent={() => <Text style={{fontSize: 16}} >Nenhuma receita encontrada!</Text>}
              showsVerticalScrollIndicator={false}              
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
        backgroundColor: '#f9f9ff',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14

    }
})