import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    ScrollView,//to be able to scroll
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView //to create buttons
 } from 'react-native';
 import Note from './Note';
  import HideWithKeyboard from 'react-native-hide-with-keyboard';


class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noteArray:[],
            noteText: "",
        }

    }
    componentDidMount() {
        StatusBar.setHidden(true);
     }
    render(){
        let notes = this.state.noteArray.map((val, key)=>{
            return <Note key= {key} keyval={key} val={val}
            deleteMethod={()=>this.deleteNote(key)} />
        } )
        return(
            <KeyboardAvoidingView
            style={styles.container}>
            <View style = {styles.container}>
               
                    <View style = {styles.header}>
                        <Text style = {styles.headerText}> KARO </Text>
                    </View>
                        
                            <ScrollView style = {styles.scorllContainer }>
                                {notes}
                            </ScrollView>

                            <HideWithKeyboard>                         
                                <TouchableOpacity onPress={this.addNote.bind(this)} style = {styles.addButton}>
                                    <Text style = {styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                           </HideWithKeyboard>

                    <View style = {styles.footer}>
                        <TextInput style = {styles.textInput}
                         onSubmitEditing={this.addNote.bind(this)}
                         onChangeText={(noteText)=>this.setState({noteText})}//everytime we change we set the state of the note text
                         value={this.state.noteText} //value of the note text
                         placeholderTextColor = "white"
                         placeholder = 'Add Notes'
                         underlineColorAndroid = 'transparent'>
                        </TextInput>
                    </View>
            </View>
            </KeyboardAvoidingView>
        );
    }
    addNote(){
        if(this.state.noteText ){ //check if the text input value is not empty
            this.state.noteArray.push({
                'note':this.state.noteText
            })
            this.setState({ noteArray :this.state.noteArray})
            this.setState({noteText: "" });

        }
    }
    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
       
        
    }, 
    header: {
        backgroundColor: '#0e82b7',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 5,
        borderBottomColor: '#92bacc',
      
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#0e82b7',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        // zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#0e82b7',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }

});

export default Main;
