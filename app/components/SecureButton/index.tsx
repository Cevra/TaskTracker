import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

type SecureButtonProps = {
  onPress: (e: GestureResponderEvent) => Promise<void>;
  text: string;
  classNames?: string;
};

const SecureButton = ({ text, onPress, classNames }: SecureButtonProps) => {
  const [isSaving, setIsSaving] = React.useState(false);

  return (
    <TouchableOpacity
      disabled={isSaving}
      onPress={async (e) => {
        setIsSaving(() => true);
        await onPress(e);
        setIsSaving(() => false);
      }}
    >
      <View
        className={`w-80 h-14 bg-primary text-center flex flex-wrap items-center content-center justify-center rounded ${
          isSaving ? 'opacity-50' : ''
        } ${classNames}`}
      >
        <Text className=" text-white text-xl font-normal">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SecureButton;
