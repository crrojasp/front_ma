import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

// Configurar el cliente de Apollo
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://192.168.80.13:5000/graphql',
    }),
    cache: new InMemoryCache(),
});

// Consulta GraphQL para obtener las mascotas recomendadas
const GET_RECOMMENDED_PETS = gql`
    query {
        allPets {
            id_pet
            age
            especie
            gender
            images
            name
        }
    }
`;

// Componente para mostrar las mascotas recomendadas en un FlatList
const RecommendedPets = () => {
    const { loading, error, data } = useQuery(GET_RECOMMENDED_PETS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <Text>Mascotas recomendadas</Text>
            <FlatList
                data={data.allPets}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.images[0] }}
                            style={styles.image}
                        />
                        <Text>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Species: {item.especie}</Text>
                        <Text>Gender: {item.gender ? 'Female' : 'Male'}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id_pet}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        width: '50%', // Reducir el tamaño de cada elemento en un 40%
        marginHorizontal: 5, // Reducir el espacio horizontal entre los elementos
        marginBottom: 20,
    },
    contentContainer: {
        paddingHorizontal: 10, // Asegurar espacio adicional a los lados para permitir desplazamiento completo
    },
    image: {
        width: '100%', // Ajustar la imagen al tamaño del contenedor
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover', // Ajustar el modo de escalado de la imagen
    },
});

// Componente que proporciona el contexto de Apollo Client a toda la aplicación
const Recommended = () => (
    <ApolloProvider client={client}>
        <RecommendedPets />
    </ApolloProvider>
);

export default Recommended;