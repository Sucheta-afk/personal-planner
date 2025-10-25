import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  // 🌟 ADDED IMPORTS 🌟
  ActivityIndicator, 
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  // 🌟 ADDED STATE FOR LOADING AND REFRESHING 🌟
  const [loading, setLoading] = useState(false); // Since tasks are hardcoded, setting to false initially
  const [refreshing, setRefreshing] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Morning meditation',
      deadline: new Date(2025, 9, 26),
      completed: false,
      priority: 'low',
    },
    {
      id: '2',
      title: 'Team meeting prep',
      deadline: new Date(2025, 9, 25),
      completed: false,
      priority: 'high',
    },
    {
      id: '3',
      title: 'Grocery shopping',
      deadline: new Date(2025, 9, 27),
      completed: true,
      priority: 'medium',
    },
  ]);

  const toggleTask = (id) => {
      setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
      ));
  };
  
  // 🌟 DEFINED onRefresh FUNCTION 🌟
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1500); 
  }, []);

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FCA5A5';
      case 'medium': return '#FDE047';
      case 'low': return '#86EFAC';
      default: return '#E2E8F0';
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6B9BD1" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good day ☀️</Text>
          <Text style={styles.subtitle}>
            You have {activeTasks.length} task{activeTasks.length !== 1 ? 's' : ''} today
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          // RefreshControl now uses the defined 'refreshing' and 'onRefresh' state/function
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Active Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Tasks</Text>
          {activeTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle-outline" size={64} color="#CBD5E1" />
              <Text style={styles.emptyText}>All caught up! 🎉</Text>
              <Text style={styles.emptySubtext}>Take a moment to breathe</Text>
            </View>
          ) : (
            activeTasks.map(task => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskCard}
                onPress={() => navigation.navigate('TaskDetail', { task })}
                activeOpacity={0.7}
              >
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleTask(task.id)}
                >
                  <Ionicons
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={28}
                    color={task.completed ? "#6B9BD1" : "#CBD5E1"}
                  />
                </TouchableOpacity>
                
                <View style={styles.taskContent}>
                  <Text style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleCompleted
                  ]}>
                    {task.title}
                  </Text>
                  <View style={styles.taskMeta}>
                    <Ionicons name="time-outline" size={14} color="#94A3B8" />
                    <Text style={styles.taskDeadline}>{formatDate(task.deadline)}</Text>
                  </View>
                </View>

                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(task.priority) }
                ]} />
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedTasks.map(task => (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskCard, styles.taskCardCompleted]}
                onPress={() => toggleTask(task.id)}
                activeOpacity={0.7}
              >
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleTask(task.id)}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={28}
                    color="#6B9BD1"
                  />
                </TouchableOpacity>
                
                <View style={styles.taskContent}>
                  <Text style={[styles.taskTitle, styles.taskTitleCompleted]}>
                    {task.title}
                  </Text>
                  <View style={styles.taskMeta}>
                    <Ionicons name="time-outline" size={14} color="#94A3B8" />
                    <Text style={styles.taskDeadline}>{formatDate(task.deadline)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
// ... (styles remain the same)
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
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
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  taskCardCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDeadline: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 4,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6B9BD1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6B9BD1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});