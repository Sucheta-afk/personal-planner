import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FCA5A5';
      case 'medium': return '#FDE047';
      case 'low': return '#86EFAC';
      default: return '#E2E8F0';
    }
  };

  const getPriorityLabel = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Title */}
        <View style={styles.section}>
          <Text style={styles.title}>{task.title}</Text>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={task.completed ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={task.completed ? "#6B9BD1" : "#CBD5E1"} 
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Status</Text>
              <Text style={styles.cardValue}>
                {task.completed ? 'Completed' : 'In Progress'}
              </Text>
            </View>
          </View>
        </View>

        {/* Deadline Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={24} color="#6B9BD1" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Deadline</Text>
              <Text style={styles.cardValue}>{formatDate(task.deadline)}</Text>
            </View>
          </View>
        </View>

        {/* Priority Card */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="flag-outline" size={24} color="#6B9BD1" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Priority</Text>
              <View style={styles.priorityBadge}>
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(task.priority) }
                ]} />
                <Text style={styles.priorityText}>
                  {getPriorityLabel(task.priority)} Priority
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>
              {task.description || 'No description added yet. Add details to keep track of what needs to be done.'}
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#6B9BD1" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 36,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B9BD1',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});