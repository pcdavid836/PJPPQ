import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const GlobalCheckBox = ({ label, value, onChange }) => {
    return (
        <View style={styles.container}>
            <Checkbox
                value={value}
                onValueChange={onChange}
                color={value ? '#008000' : undefined}
            />
            {label && <Text style={styles.label}>{label}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        marginLeft: 8,
        fontSize: 14,
    },
});

export default GlobalCheckBox;