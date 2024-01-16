import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScheduleMember } from 'types';

type NoteModalProps = {
  worker: ScheduleMember;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onNoteSubmit: (note: string) => void;
};

const MAX_CHARACTERS = 255;

const NoteModal: React.FC<NoteModalProps> = ({
  worker,
  isVisible,
  setIsVisible,
  onNoteSubmit,
}) => {
  const [note, setNote] = useState(worker?.note ?? '');

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

      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={{
          flex: 1,
          marginBottom: 100,
        }}
      >
        <View
          style={{
            backgroundColor: '#C7DEF3',
            padding: 20,
            borderRadius: 10,
            width: '90%',
            borderWidth: 1,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
            Add Note
          </Text>
          <TextInput
            autoFocus={true}
            style={{
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: '#fff',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
              maxHeight: 120,
            }}
            placeholder="Enter your note"
            multiline
            maxLength={MAX_CHARACTERS}
            value={note}
            onChangeText={(text) => setNote(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'black' }}>
              {note.length}/{MAX_CHARACTERS}
            </Text>
            <TouchableOpacity
              onPress={handleNoteSubmit}
              style={{
                backgroundColor: '#1F87FE',
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NoteModal;
