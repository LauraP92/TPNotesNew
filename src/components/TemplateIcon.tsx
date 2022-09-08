import React, { FC } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { ColorValue } from 'react-native';

interface Props {
    name: string,
    family: string,
    size: number,
    color: ColorValue,
}
const getIcon = (iconFamily: string) => {
    switch (iconFamily) {
        case 'MaterialIcon':
            return MaterialIcon;
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons;
        case 'Feather':
            return FeatherIcon;
        case 'AntDesign':
            return AntDesignIcon;
        case 'Entypo':
            return EntypoIcon;
        case 'EvilIcons':
            return EvilIcons;
        case 'FontAwesome':
            return FontAwesome;
        case 'FontAwesome5':
            return FontAwesome5;
        case 'Fontisto':
            return Fontisto;
        case 'Foundation':
            return Foundation;
        case 'Ionicons':
            return Ionicons;
        case 'Octicons':
            return Octicons;
        case 'SimpleLine':
            return SimpleLineIcons;
        case 'Zocial':
            return Zocial;
        default:
            return FontAwesome5;
    }
};

const TemplateIcon: FC<Props> = ({ name, family, size, color, ...rest }) => {
    const Icon = getIcon(family);

    return <Icon name={name} size={size} color={color} {...rest} />;
};

export default TemplateIcon;
