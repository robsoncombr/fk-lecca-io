import { Module } from '@nestjs/common';
import {
  AgentMessageController,
  AgentTasksController,
  TasksController,
} from './tasks.controller';
import { TasksService } from './tasks.service';
import { WorkflowAppsService } from '@/modules/core/workflow-apps/workflow-apps.service';
import { ConnectionsService } from '../connections/connections.service';
import { ExecutionsService } from '../executions/executions.service';
import { KnowledgeService } from '../knowledge/knowledge.service';

@Module({
  imports: [],
  controllers: [TasksController, AgentTasksController, AgentMessageController],
  exports: [TasksService],
  providers: [
    TasksService,
    WorkflowAppsService,
    ConnectionsService, //For workflow apps service
    ExecutionsService, //For workflow apps service
    KnowledgeService,
  ],
})
export class TasksModule {}
