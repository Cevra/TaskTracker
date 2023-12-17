import React from 'react';

import { TextInput, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

interface SearchProps {
  search: string;
  clicked: boolean;
  classNames?: string;
  setSearch: (search: string) => void;
  setClicked: (clicked: boolean) => void;
}

const Search = ({
  clicked,
  search,
  setSearch,
  setClicked,
  classNames,
}: SearchProps) => {
  return (
    <View className={`w-full px-4 ${classNames}`}>
      <View
        className={`flex flex-row w-full justify-center items-center bg-[#fff] p-2 rounded-lg ${
          clicked ? '' : ''
        }`}
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          className="pb-2 ml-2 w-10/12 text-base"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearch('');
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
