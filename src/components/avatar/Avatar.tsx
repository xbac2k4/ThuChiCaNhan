import { ColorsDefault } from 'assets/colors';
import Block from 'components/base/Block';
import images from 'constants/images';
import {memo, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {ImageStyle, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'store/store';

interface Propstype {
  onPress?: () => void;
  containnerStyle?: StyleProp<ViewStyle>;
  imageStyle: ImageStyle;
  source?: {
    uri: string;
  };
  border?: number;
}

const Avatar: React.FC<Propstype> = memo(
  ({onPress, containnerStyle, imageStyle, source, border}) => {
    const {avatar, profile} = useSelector(
      (state: RootState) => state.AuthReducer,
    );
    const [image, setImage] = useState<any>(images.user);

    useEffect(() => {
      if (avatar) {
        setImage({uri: `${avatar}`});
      } else {
        if (profile?.user?.employee?.gender) {
          const isGender = profile.user.employee.gender?.includes('1');
          if (!isGender) {
            setImage(images.user);
          }
        }
      }
    }, [avatar]);

    return (
      <Block onPress={onPress} style={containnerStyle}>
        {source?.uri ? (
          <Image style={[styles.image, imageStyle]} source={source} />
        ) : (
          <Image style={[styles.image, imageStyle]} source={image} />
        )}
      </Block>
    );
  },
  isEqual,
);

export default Avatar;

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: '#fff',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  shadow: {
    shadowColor: ColorsDefault.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
