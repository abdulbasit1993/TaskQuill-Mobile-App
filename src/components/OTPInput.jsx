import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../constants/colors';

const NUMBER_OF_INPUTS = 4;

const defaultOptions = {
  cancelOnUnmount: true,
};

const useTimeout = (fn, milliseconds, options = defaultOptions) => {
  const opts = {...defaultOptions, ...(options || {})};
  const timeout = useRef();
  const callback = useRef(fn);
  const [isCleared, setIsCleared] = useState(false);

  // The clear method
  const clear = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      setIsCleared(true);
    }
  }, []);

  // If the provided function changes, change its reference
  useEffect(() => {
    if (typeof fn === 'function') {
      callback.current = fn;
    }
  }, [fn]);

  // When the milliseconds change, reset the timeout (if not null)
  // If milliseconds are null, clear the timeout
  useEffect(() => {
    if (milliseconds !== null) {
      timeout.current = setTimeout(() => {
        callback.current();
      }, milliseconds);
    } else {
      clear();
    }
    return clear;
  }, [milliseconds]);

  // When component unmounts, clear the timeout
  useEffect(
    () => () => {
      if (opts.cancelOnUnmount) {
        clear();
      }
    },
    [],
  );

  return [isCleared, clear];
};

const OTPInput = props => {
  const {otpCodeChanged} = props;
  const isFocused = useIsFocused();
  const [values, setValues] = useState(['', '', '', '']);
  const itemsRef = useRef([]);

  const applyOTPCodeToInputs = code => {
    const codeArray = code.split('');
    codeArray.forEach((char, index) => {
      const input = itemsRef.current[index];
      if (input) {
        input.setNativeProps({
          text: char,
        });
      }
    });

    const lastInput = itemsRef.current[itemsRef.current.length - 1];

    if (lastInput) {
      lastInput.focus();
      otpCodeChanged(code);
    }
  };

  useTimeout(
    () => {
      const firstInput = itemsRef.current[0];
      if (firstInput) {
        firstInput.focus();
      }
    },
    isFocused ? 1000 : null,
  );

  return (
    <View style={styles.container}>
      {Array.from({length: NUMBER_OF_INPUTS}, (_, index) => (
        <TextInput
          style={styles.input}
          ref={el => (itemsRef.current[index] = el)}
          key={index}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={'#888'}
          value={values[index]}
          defaultValue=""
          maxLength={index === 0 ? 4 : 1}
          onChange={event => {
            const {text} = event.nativeEvent;

            if (text.length === 0 || text.length === 1 || text.length === 4) {
              if (text.length === 4) {
                applyOTPCodeToInputs(text);
                return;
              }
              if (text.length === 1 && index !== NUMBER_OF_INPUTS - 1) {
                const nextInput = itemsRef.current[index + 1];
                if (nextInput) {
                  nextInput.focus();
                }
              }
            }

            const newValues = [...values];
            newValues[index] = text;

            setValues(newValues);

            otpCodeChanged(newValues.join(''));
          }}
          onKeyPress={event => {
            if (event.nativeEvent.key === 'Backspace') {
              if (index !== 0) {
                const previousInput = itemsRef.current[index - 1];
                if (previousInput) {
                  previousInput.focus();
                  return;
                }
              }
            }
          }}
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    color: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.WHITE,
    borderRadius: 5,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default OTPInput;
