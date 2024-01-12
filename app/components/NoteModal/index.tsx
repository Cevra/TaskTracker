import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScheduleMember } from 'types';

type NoteModalProps = {
  worker:ScheduleMember;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onNoteSubmit: (note: string) => void;
};

const MAX_CHARACTERS = 255;

const NoteModal: React.FC<NoteModalProps> = ({worker,isVisible, setIsVisible, onNoteSubmit }) => {
  const [note, setNote] = useState(worker?.note  ?? '');
  useEffect(() => {setNote(worker.note ?? '')} , [worker]);
  const handleNoteSubmit = () => {
    onNoteSubmit(note);
    setNote(''); 
    setIsVisible(false); 
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1 }} />
        </View>
      </TouchableWithoutFeedback>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#C7DEF3', padding: 20, borderRadius: 10, width: '90%' }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>Add Note</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#fff', backgroundColor: '#fff', borderRadius: 5, padding: 10, marginBottom: 10 }}
            placeholder="Enter your note"
            multiline
            maxLength={MAX_CHARACTERS}
            value={note}
            onChangeText={(text) => setNote(text)}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>{note.length}/{MAX_CHARACTERS}</Text>
            <TouchableOpacity onPress={handleNoteSubmit} style={{ backgroundColor: '#1F87FE', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;
