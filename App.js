import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchTime, setPunchTime] = useState(null);
  const [workDuration, setWorkDuration] = useState(9 * 60 * 60 * 1000); // 9 hours
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (endTime) {
        const diff = Math.max(endTime - new Date(), 0);
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const handlePunch = () => {
    const now = new Date();
    
    // 檢查是否已經在同一天打卡
    if (punchTime && isSameDay(punchTime, now)) {
      Alert.alert('提示', '今天已經打卡過了！');
      return;
    }

    setPunchTime(now);
    const end = new Date(now.getTime() + workDuration);
    setEndTime(end);
  };

  const handleReset = () => {
    setPunchTime(null);
    setEndTime(null);
    setTimeLeft(null);
  };

  const formatTime = (date) => format(date, 'HH:mm');
  const formatCountdown = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>打卡提醒</Text>
          <Text style={styles.text}>當前時間：{formatTime(currentTime)}</Text>
          {punchTime && <Text style={styles.text}>上班時間：{formatTime(punchTime)}</Text>}
          {endTime && <Text style={styles.text}>下班時間：{formatTime(endTime)}</Text>}
          {timeLeft !== null && <Text style={styles.text}>倒計時：{formatCountdown(timeLeft)}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handlePunch}
          >
            <Text style={styles.buttonText}>
              {punchTime ? '重新打卡' : '打卡'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>重置</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
