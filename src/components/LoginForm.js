import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import { validateEmail } from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({})
    const [viewError, setViewError] = useState(true);
    const [messageError, setMessageError] = useState('');

    const login = () => {
        let errors = {};

        if (!formData.email || !formData.password)
        {
            if(!formData.email) {errors.email = true; setViewError(true);}
            if(!formData.password) {errors.password = true; setViewError(true);}
            setMessageError('Algún campo está vacío');
        }
        else if (!validateEmail(formData.email))
        {
            errors.email = true;
            setViewError(true);
            setMessageError('Formato de correo electrónico incorrecto');
        }
        else
        {
            setViewError(false);
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setViewError(false);
                setMessageError('');
                console.log("OK");
            })
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,
                });
                setViewError(true);
                setMessageError('Credenciales incorrectas');
            });
        }
        setFormError(errors);
    }

    const onChange = (e, type) => {
        //console.log("Data: ", e.nativeEvent.text);
        //console.log("Type: ", type);
        setFormData({...formData, [type]: e.nativeEvent.text});
    };

    return (
        <>
            <TextInput 
                placeholder='Correo electrónico'
                placeholderTextColor="#969696"
                style = {[styles.input, formError.email && styles.error]}
                onChange = {(e) => onChange(e, "email")}
            />
            <TextInput 
                placeholder='Contraseña'
                secureTextEntry = {true}
                placeholderTextColor="#969696"
                style = {[styles.input, formError.password && styles.error]}
                onChange = {(e) => onChange(e, "password")}
            />
            {(viewError) && (<Text style = {styles.errores}>{messageError}</Text>)}
            <TouchableOpacity onPress={login} >
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <View style = {styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Regístrate</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

function defaultValue(){
    return {
        email: '',
        password: '',
    }
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
    register:{
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
    }
})
