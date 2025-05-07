## Product Requirements Document (PRD): Nexus AI Platform Revamp

### Overview
Nexus AI is a web-based platform designed to manage AI development tools, offering streamlined access to AWS SageMaker instances, AI model integration through LiteLLM, and detailed analytics for performance monitoring. This revamp aims to enhance UI/UX, streamline user interactions, and provide robust analytics.

---

### App Goals
- Improve user experience with intuitive, fluid UI design
- Simplify model access through LiteLLM API key management
- Enhance analytics visibility for model usage, latency, and cost
- Streamline chat interactions using LiteLLM proxy
- Provide comprehensive dashboard with clear, insightful data

---

### Technology Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** AWS Lambda (serverless architecture)
- **Authentication:** Clerk (user management with webhooks)
- **Deployment:** AWS Amplify
- **Proxy Server:** LiteLLM deployed via AWS ECS

---

### User Flow
1. User logs into Nexus AI via Clerk authentication.
2. Upon successful login, users land on the Dashboard, presenting metrics and performance summaries.
3. Users navigate to the Model Hub to manage API keys and access various AI models.
4. In the Chat Playground, users interact directly with LiteLLM integrated models.
5. Users can view comprehensive analytics data (cost, latency, usage metrics) via the Analytics tab.
6. Admin users can switch to the admin view for extended administrative capabilities.

---

### Main Features

#### Dashboard
- Display key metrics using mock data (app usage, AI library usage, active project progress, top models, training statistics)
- Time-filtered insights (start and end dates)

#### Model Hub
- LiteLLM API key generation and management
- Model browsing and detailed access (OpenAI, Anthropic, Google Gemini, HuggingFace, Meta Llama, DeepSeek)
- Search and filtering capabilities

#### Chat Playground
- Integrated LiteLLM chat interface
- Document upload and deep research features
- Model switching capabilities within chat

#### Analytics
- Detailed trace logs (model requests and completions)
- Cost breakdown per model and total
- Latency metrics (average response time)
- Uptime and error rate monitoring
- Requests per second data
- Hardware utilization analytics (A100, A6000, RTX4090, CPU usage)

#### User & Organization Management
- Clerk-based authentication
- Automated user creation through webhook integration
- User synchronization across internal user database and LiteLLM proxy

---

### Deliverables
- Revamped UI/UX design implemented in Next.js and Tailwind CSS
- Integrated LiteLLM functionality across all primary app sections
- Improved analytics visibility and reporting
- Deployment-ready, tested application via AWS Amplify

---

### Acceptance Criteria
- Fluid and responsive UI experience across all devices
- Successful user authentication and data consistency across Clerk, internal database, and LiteLLM
- Accurate and timely analytics reporting
- Fully functional LiteLLM chat and model access
- Stable deployment through AWS Amplify

## Multiple Deployment Configurations

This project supports deployment to multiple environments with different branding and configurations.

### Available Deployments

1. **KPR College** (Main/Dev Branches)
   - Custom branding for KPR College
   - Deployed to primary AWS account

2. **Nexus AI Platform** (Nexus Branch)
   - Generic branding for Nexus AI Platform
   - Deployed to secondary AWS account

### Switching Between Environments Locally

Use the built-in switch-env script to toggle between environments:

```bash
# Switch to KPR environment
npm run use:kpr

# Switch to Nexus environment
npm run use:nexus

# Then start the development server
npm run dev
```

### Managing Code Across Environments

The project uses a single codebase with environment-specific configuration. When adding new features:

1. Make changes in one branch first (e.g., `main` or `dev`)
2. Test thoroughly
3. Merge or cherry-pick changes to the `nexus` branch
4. Test to ensure the Nexus-branded version works correctly

### Deployment Process

#### KPR College Deployment
- Push to `main` branch for production, `dev` branch for testing
- AWS Amplify automatically deploys from the configured branch

#### Nexus AI Platform Deployment
- Push to `nexus` branch
- AWS Amplify in the secondary account deploys automatically

### Adding New Environment-Specific Configuration

To add new configuration that varies between deployments:

1. Add the variable to both `.env.kpr` and `.env.nexus` files
2. Update the `config-provider.jsx` file to include the new variable
3. Use the variable in your components with the `useConfig` hook

