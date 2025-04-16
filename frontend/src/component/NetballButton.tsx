import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import Svg, { Path, Defs, LinearGradient, Stop, RadialGradient, G } from 'react-native-svg'

type NetballButtonProps = {
    label: string
    name?: string
    onPress?: () => void
    onLongPress?: () => void
    style?: ViewStyle
    size?: number | null
    ballColor1?: string
    ballColor2?: string
    positionColor?: string
    disabled?: boolean
}

const NetballButton: React.FC<NetballButtonProps> = ({
    label, 
    name, 
    onPress, 
    onLongPress,
    style, 
    size = 105, 
    ballColor1 = '#ffb300', 
    ballColor2 = '#fff', 
    positionColor = '#1c7ed6',
    disabled = false
}) => {
    return (
        <TouchableOpacity style={[styles.container, {opacity: (disabled ? 0.4 : 1)}, style]} onPress={onPress} onLongPress={onLongPress} delayLongPress={500}>
            <View style={{ width: size, height: size }}>
                <Svg width={'100%'} height={'100%'} viewBox="0 0 105 105">
                    <Defs>
                        <LinearGradient>
                            <Stop offset={0} stopColor={ballColor2} stopOpacity={1} />
                            <Stop offset={1} stopColor="#8e8f9c" stopOpacity={0} />
                        </LinearGradient>
                        <LinearGradient>
                            <Stop offset={0} stopColor={ballColor2} stopOpacity={1} />
                            <Stop offset={1} stopColor="#070000" stopOpacity={1} />
                        </LinearGradient>
                            <RadialGradient
                                cx={285.93787}
                                cy={654.14728}
                                fx={285.93787}
                                fy={654.14728}
                                r={139.57143}
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="matrix(-2.01037 -1.30223 .51082 -.78865 546.465 1428.213)"
                            />
                            <RadialGradient
                                cx={315.53583}
                                cy={551.55267}
                                fx={315.53583}
                                fy={551.55267}
                                r={139.57143}
                                gradientUnits="userSpaceOnUse"
                            />
                            <RadialGradient
                                gradientUnits="userSpaceOnUse"
                                cx={315.53583}
                                cy={551.55267}
                                fx={315.53583}
                                fy={551.55267}
                                r={139.57143}
                            />
                            <RadialGradient
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="matrix(-2.01037 -1.30223 .51082 -.78865 546.465 1428.213)"
                                cx={285.93787}
                                cy={654.14728}
                                fx={285.93787}
                                fy={654.14728}
                                r={139.57143}
                            />
                            <RadialGradient
                                gradientUnits="userSpaceOnUse"
                                cx={315.53583}
                                cy={551.55267}
                                fx={315.53583}
                                fy={551.55267}
                                r={139.57143}
                            />
                    </Defs>
                    <Path
                        d="M360 620.934a138.571 138.571 0 11-277.143 0 138.571 138.571 0 11277.143 0z"
                        transform="translate(1.042 .28) scale(.36032) rotate(-4.885 -5389.258 1297.432)"
                        opacity={1}
                        fill={ballColor2}
                        fillOpacity={1}
                        fillRule="nonzero"
                        stroke="url(#c)"
                        strokeWidth={1.99999893}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit={4}
                        strokeDasharray="none"
                        strokeOpacity={1}
                    />
                    <Path
                        d="M266.428 192.571c3.03 4.798 1.01 14.9 1.01 14.9l9.849-27.022-10.86 12.122zM176.786 248.571c-5.357 23.929-7.5 25-16.786 34.643 42.857-10 57.857-21.428 57.857-21.428s11.786-22.5 7.143-37.5c-5.357 4.643-35 21.428-48.214 24.285zM9.286 110c-10.727 55.788 4.401 96.188 28.437 124.598 38.371 45.354 92.991 49.33 92.991 49.33s-53.571-15.357-82.143-79.642c-11.25-21.786-19.642-58.304-12.5-95.715-16.071-.625-1.25.358-26.785 1.429zM100.72 177.45c7.07 25.253 28.074 42.9 28.074 42.9s57.73-20.443 94.955-49.497c35.56-27.755 33.901-29.365 55.232-49.498-3.643-20.391-9.27-36.483-21.361-53.538-2.668 10.889-58.499 58.697-62.482 61.442-5.265 3.628-48.615 34.41-94.419 48.19z"
                        transform="translate(1.042 .28) scale(.36032)"
                        fill={ballColor1}
                        fillOpacity={1}
                        fillRule="evenodd"
                        stroke={ballColor1}
                        strokeWidth="1px"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeOpacity={1}
                    />
                    <Path
                        d="M39.032 56.536c24.57-2.73 58.934 5.545 60.14 5.945 33.422 11.085 47.988 27.688 47.988 27.688l-53.485 31.934S60.792 99.506 9.843 109.878c6.429-28.464 28.117-53.342 29.189-53.342zM105.56 12.259c71.217 3.535 94.955 34.345 94.955 34.345s9.456-9.673 14.142-18.183c1.535-2.787-50.507-31.314-109.096-16.162z"
                        transform="translate(1.042 .28) scale(.36032)"
                        fill={ballColor1}
                        fillOpacity={1}
                        fillRule="evenodd"
                        stroke={ballColor1}
                        strokeWidth="1px"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeOpacity={1}
                    />
                    <G fill="none" fillOpacity={1}>
                        <Path
                            d="M360 620.934a138.571 138.571 0 11-277.143 0 138.571 138.571 0 11277.143 0z"
                            transform="translate(1.042 .28) scale(.36032) translate(-49.084 -29.276) rotate(-4.885 -5021.556 736.728)"
                            fill="none"
                            fillOpacity={1}
                            fillRule="nonzero"
                            stroke="#97978a"
                            strokeWidth={1.99999893}
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit={4}
                            strokeDasharray="none"
                            strokeOpacity={1}
                        />
                        <Path
                            d="M59.164 139.373c55.39-8.41 82.756 12.637 82.756 12.637s47.875-25.658 79.92-50.095c28.759-21.93 42.351-44.303 42.351-44.303"
                            transform="translate(1.042 .28) scale(.36032) translate(-49.084 -29.276)"
                            fill="none"
                            fillOpacity={1}
                            fillRule="evenodd"
                            stroke="#97978a"
                            strokeWidth={2}
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit={4}
                            strokeDasharray="none"
                            strokeOpacity={1}
                        />
                        <Path
                            d="M142.093 151.444c-8.287 104.952 84.223 122.421 83.468 126.26-4.443 22.582-12.499 30.124-16.532 34.23M225.182 277.46c77.288-30.966 102.69-69.946 102.156-70.539"
                            transform="translate(1.042 .28) scale(.36032) translate(-49.084 -29.276)"
                            fill="none"
                            fillOpacity={1}
                            fillRule="evenodd"
                            stroke="#97978a"
                            strokeWidth={2}
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit={4}
                            strokeDasharray="none"
                            strokeOpacity={1}
                        />
                        <Path
                            d="M148.74 206.92c80.141-30.013 109.657-60.574 132.623-81.933 22.967-21.359 24.582-29.081 24.582-29.081M178.271 249.567c80.142-30.014 109.056-61.24 132.624-81.934 19.038-16.716 17.881-16.983 17.881-16.983M196.83 119.298C151.492 77.045 86.735 85.154 86.735 85.154M249.747 75.728c-44.39-40.47-101.907-31.92-101.907-31.92M274.713 252.857c4.715 16.942-8.454 39.169-8.454 39.169M315.567 221.545c2.86 10.039-.947 18.71-.947 18.71M85.2 137.81c-14.37 76.276 36.94 137.073 51.165 149.1 23.138 19.562 35.758 24.452 53.998 26.483"
                            transform="translate(1.042 .28) scale(.36032) translate(-49.084 -29.276)"
                            fill="none"
                            fillOpacity={1}
                            fillRule="evenodd"
                            stroke="#97978a"
                            strokeWidth={2}
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit={4}
                            strokeDasharray="none"
                            strokeOpacity={1}
                        />
                    </G>
                    <Path
                        d="M360 620.934a138.571 138.571 0 11-277.143 0 138.571 138.571 0 11277.143 0z"
                        transform="translate(1.042 .28) scale(.36032) rotate(-4.885 -5389.258 1297.432)"
                        opacity={0.1866029}
                        fill="url(#d)"
                        fillOpacity={1}
                        fillRule="nonzero"
                        stroke="url(#radialGradient1360)"
                        strokeWidth={1.99999893}
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit={4}
                        strokeDasharray="none"
                        strokeOpacity={1}
                    />
                </Svg>
                <Text style={[styles.label, {fontSize: ((size ? size : 105) / 2), color: positionColor}]}>{label}</Text>
            </View>
            <Text style={styles.floatingLabel}>{name}</Text>
        </TouchableOpacity>
    )
}

export default NetballButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1c7ed6',
        zIndex: 2,
        textShadowColor: '#00000040',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }]
    },
    floatingLabel: {
        position: 'absolute',
        bottom: -5,
        left: '-25%',
        minWidth: '150%',
        maxWidth: '150%',
        width: '150%',
        textAlign: 'center',
        fontWeight: 'bold',
        height: 20
    },
    disabled: {
        opacity: 0.4
    }
})
  