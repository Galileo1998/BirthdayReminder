import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from "../utils/firebase";
export default function RegisterForm(props) {
// render
    const [formData, setFormData] = useState(defaultValue());   
    const [formError, setFormError] = useState({});
    const [viewError, setViewError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const {changeForm} = props;
    const register = () => {
        let errors = {};

        if(!formData.email || !formData.password || !formData.repeatPassword)
        {
            if (!formData.email) {errors.email = true; setViewError(true);}
            if (!formData.password) {errors.password = true;  setViewError(true);}
            if (!formData.repeatPassword) {errors.repeatPassword = true;  setViewError(true);}
            setMessageError('Algún campo está vacío');
        }
        else if(!validateEmail(formData.email))
        {
            errors.email = true;
            setViewError(true);
            setMessageError('Correo electrónico inválido');
        }
        else if (formData.password !== formData.repeatPassword)
        {
            errors.password = true;
            errors.repeatPassword = true;
            setViewError(true);
            setMessageError('Formato de correo electrónico incorrecto');
        }
        else if (formData.password.length < 6)
        {
            errors.password = true;
            errors.repeatPassword = true;
            setViewError(true);
            setMessageError('La contraseña debe ser mayor a 6 caracteres');
        }
        else{
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {})
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                });
            });
            console.log("Cuenta creada");
            setViewError(false);
        }
        
        setFormError(errors);
        console.log(errors);
    }

    return (
        <>
            <TextInput 
                placeholder='Correo Electrónico' 
                placeholderTextColor={"#969696"}
                style= {[styles.input, formError.email && styles.error]}
                onChange = {(e) => setFormData({...formData, email: e.nativeEvent.text})}/>
            <TextInput 
                placeholder='Contraseña' 
                placeholderTextColor={"#969696"}
                style= {[styles.input, formError.password && styles.error]}
                secureTextEntry = {true}
                onChange = {(e) => setFormData({...formData, password: e.nativeEvent.text})}/>
            <TextInput 
                placeholder='Repetir Contraseña' 
                placeholderTextColor={"#969696"}
                style= {[styles.input, formError.repeatPassword && styles.error]}
                secureTextEntry = {true}
                onChange = {(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}/>
            
            {(viewError) && (<Text style = {styles.errores}>{messageError}</Text>)}

            <TouchableOpacity onPress={register} >
                <Text style={styles.btnText}>Regístrate</Text>
            </TouchableOpacity>
   

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue(){
    return {
        email: '',
        password: '',
        repeatPassword: '',
    };
}

const styles = StyleSheet.create({
    btnText: {
        color: "#FFF",
        fontSize: 18,
    },
    input:{
        heigt: 40,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1E3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1E3040",
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    error: {
        borderColor: "#940C0C",
    },
    errores:
    {
        color: "red",
        marginBottom: 10,
    }
})
