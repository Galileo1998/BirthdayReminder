import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default function Birthday(props) {
    const {birthday, deleteBirthday} = props;
    const pasat = birthday.days > 0 ? true : false;
    
    const infoDay = () => {
        if(birthday.days === 0)
        {
            return(
                <Text style = {{color : "#FFF"}}>Es su cumpleaños</Text>
            );
        }
        else
        {
            const days = -birthday.days;
            return (
                <View style = {styles.textCurrent}>
                    <Text style = {{color: "#000"}}>{days}</Text>
                    <Text style={{color: "#000"}}>{days === 1 ? 'día' : 'días'}</Text>
                </View>
            );
        }

    }
// render
    return (
        <TouchableOpacity style={[styles.card, pasat ? styles.pasat : birthday.days ===0 ? styles.actual : styles.current]} 
        onPress = {() => deleteBirthday(birthday)}>
            <Text style = {styles.username}>
                {birthday.name} {birthday.lastname}
            </Text>
            {pasat ? <Text style = {{color: "#FFF"}}>Pasado</Text>: infoDay()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    current: {
        backgroundColor: "#3783E6",
    },
    pasat:{
        backgroundColor: "#820000"
    },
    actual: {
        backgroundColor: "#559204",
    },
    username: {
        color: "#FFF",
        fontSize: 16,
    },
    textCurrent: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    }
})
