import combineRouters from '../utils/combineRoutes';
import dynamodb from './tableRoutes';
import transactionRoutes from './transectionRoutes';
import walletRoutes from './walletRoutes'
const routers = combineRouters([walletRoutes, dynamodb, transactionRoutes])

export default routers
