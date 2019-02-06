import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {};
export default class ClapButton extends Component<Props> {
    state = {
        count: 0,
        claps: []
    }

    animationComplete = (index) => {
        let {claps} = this.state;
        claps.splice(claps.indexOf(index), 1);
        this.setState({claps})
    }

    clap = () => {
        let {count, claps} = this.state;
        claps.push(++count);
        this.setState({count, claps});
    }

    keepClapping = () => {
        this.clapInterval = setInterval(() => this.clap(), 150);
    }

    stopClapping = () => {
        clearInterval(this.clapInterval);
    }

    renderClaps = () => {
        return this.state.claps.map(index => <ClapBubble key={index} count={index} animationComplete={this.animationComplete}/>)
    }

    render() {
        let clapImageSource = this.state.count > 0 ? require('../images/clap_closed.png') : require('../images/clap_open.png')
        return (
            <View style={{flex:1}}>
                <TouchableOpacity
                    onPress={this.clap}
                    onPressIn={this.keepClapping}
                    onPressOut={this.stopClapping}
                    activeOpacity={0.7}
                    style={styles.clapButton}>
                    <Image source={clapImageSource} style={{width:30, height:30}} />
                </TouchableOpacity>
                {this.renderClaps()}
            </View>
        );
    }
}

class ClapBubble extends Component<Props> {
    state = {
        yPosition: new Animated.Value(0),
        opacity: new Animated.Value(0)
    }

    componentDidMount() {
        let {animationComplete, count} = this.props
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -150,
                duration: 500
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500
            })
        ]).start(() => {
            setTimeout(() => {
                animationComplete(count);
            }, 500);
        });
    }

    render() {
        let {count} = this.props;
        let animationStyle = {
            transform: [{translateY: this.state.yPosition}]
        };
        return (
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+{count}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    clapButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#ECF0F1',
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clapBubble: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#9933FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clapText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
