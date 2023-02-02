import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {
// render
    const {user, setShowList, setReloadData} = props;
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    


    const hideDatePicker = () => {
        setisDatePickerVisible(false);
    };

    const showDatePicker = () =>{
        setisDatePickerVisible(true);
    }

    const handleConfirm = (date) => {
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({...formData, dateBirth});
        console.log(formData);
        setisDatePickerVisible(false);
    };

    const onChange = (e, type) =>
    {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = () => {
        let errors = {};
        if (!formData.name || !formData.lastname || !formData.dateBirth){
            if(!formData.name) {errors.name = true; setErrorMessage(true)}
            if(!formData.lastname) {errors.lastname = true; setErrorMessage(true)}
            if(!formData.dateBirth) {errors.dateBirth = true; setErrorMessage(true)}
        }
        else{
            setErrorMessage(false);
            const data = formData;
            data.dateBirth.setYear(0);
            db.collection(user.uid)
            .add(data)
            .then(() => {
              setReloadData(true);
              setShowList(true);
            })
            .catch(() => {
              setFormError({name: true, lastname: true, dateBirth: true});
            });
        }
        setFormError(errors);
    }

    return (
        <>
        <View style = {styles.container}>
            <TextInput 
                       style={[styles.input, formError.name && {borderColor: '#940C0C'}]}
                       placeholder='Nombre'
                       placeholderTextColor= "#969696"
                       onChange = {(e) => onChange(e, 'name')}
            />
            <TextInput 
                       style={[styles.input, formError.lastname && {borderColor: '#940C0C'}]}
                       placeholder='Apellido'
                       placeholderTextColor= "#969696"
                       onChange = {(e) => onChange(e, 'lastname')}
            />
            <View style = {[styles.input, styles.datePicker, formError.dateBirth && {borderColor: '#940C0C'}]}>
                <Text style = {{color: formData.dateBirth ? "#FFF": "#969696", fontSize: 18}}
                    onPress = {showDatePicker}>
                    {formData.dateBirth ? moment(formData).format('LL') 
                    : 'Fecha de nacimiento'}
                </Text>
            </View>
            {
                errorMessage? 
                <Text style = {styles.textErrorMessage}>Algunos campos están vacíos</Text> 
                : <></>
            }
            
            <TouchableOpacity onPress={onSubmit}>
                <Text style={styles.addButton}>Crear cumpleaños</Text>
            </TouchableOpacity>
        </View>
        <View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 50,
        color: "#FFF",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1E3040",
        paddingHorizontal: 20,
        paddingRight: 50,
        fontSize: 18,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#1E3040",
    },
    datePicker: {
        justifyContent: "center",
    },
    textDate: {
        color: "#969696",
        fontSize: 18,
    },
    addButton:{
        fontSize: 18,
        color: "#FFF"
    },
    textErrorMessage: {
        fontSize: 18,
        paddingBottom: 15,
        color: "#940C0C",
    }
})
