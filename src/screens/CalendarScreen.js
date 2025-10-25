import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample tasks by date
  const tasksByDate = {
    '2025-10-25': [
      { id: '1', title: 'Team meeting prep', time: '10:00 AM', priority: 'high' },
      { id: '2', title: 'Code review', time: '2:00 PM', priority: 'medium' },
    ],
    '2025-10-26': [
      { id: '3', title: 'Morning meditation', time: '7:00 AM', priority: 'low' },
      { id: '4', title: 'Project presentation', time: '3:00 PM', priority: 'high' },
    ],
    '2025-10-27': [
      { id: '5', title: 'Grocery shopping', time: 'Anytime', priority: 'medium' },
    ],
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const getDateKey = (day) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const hasTasksOnDay = (day) => {
    const dateKey = getDateKey(day);
    return tasksByDate[dateKey] && tasksByDate[dateKey].length > 0;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           selectedDate.getMonth() === today.getMonth() &&
           selectedDate.getFullYear() === today.getFullYear();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FCA5A5';
      case 'medium': return '#FDE047';
      case 'low': return '#86EFAC';
      default: return '#E2E8F0';
    }
  };

  const renderCalendar = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasTasks = hasTasksOnDay(day);
      const today = isToday(day);
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            today && styles.todayCell,
          ]}
          onPress={() => {}}
        >
          <Text style={[
            styles.dayText,
            today && styles.todayText,
          ]}>
            {day}
          </Text>
          {hasTasks && (
            <View style={styles.taskIndicator} />
          )}
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const todayKey = getDateKey(new Date().getDate());
  const todayTasks = tasksByDate[todayKey] || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <Text style={styles.headerSubtitle}>Plan your peaceful days</Text>
      </View>

      {/* Calendar Card */}
      <View style={styles.calendarCard}>
        {/* Month Navigation */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#64748B" />
          </TouchableOpacity>
          
          <Text style={styles.monthText}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Day Names */}
        <View style={styles.dayNamesContainer}>
          {dayNames.map(day => (
            <View key={day} style={styles.dayNameCell}>
              <Text style={styles.dayNameText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {renderCalendar()}
        </View>
      </View>

      {/* Today's Tasks */}
      <View style={styles.todaySection}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        
        {todayTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="sunny-outline" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>No tasks for today</Text>
            <Text style={styles.emptySubtext}>Enjoy your free time! ☕</Text>
          </View>
        ) : (
          todayTasks.map(task => (
            <View key={task.id} style={styles.taskCard}>
              <View style={[
                styles.taskPriorityBar,
                { backgroundColor: getPriorityColor(task.priority) }
              ]} />
              <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <View style={styles.taskTime}>
                  <Ionicons name="time-outline" size={14} color="#94A3B8" />
                  <Text style={styles.taskTimeText}>{task.time}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    margin: 24,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayNameCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  todayCell: {
    backgroundColor: '#6B9BD1',
    borderRadius: 12,
  },
  dayText: {
    fontSize: 14,
    color: '#1E293B',
  },
  todayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  taskIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6B9BD1',
  },
  todaySection: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  taskPriorityBar: {
    width: 4,
  },
  taskContent: {
    flex: 1,
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  taskTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTimeText: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 4,
  },
});