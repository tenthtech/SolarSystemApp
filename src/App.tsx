import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { CustomerAppLayout } from './layouts/CustomerAppLayout'
import { PresentationLayout } from './layouts/PresentationLayout'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminModulePage } from './pages/AdminModulePage'
import { AddCustomerPage } from './pages/AddCustomerPage'
import { AddInstallationPage } from './pages/AddInstallationPage'
import { CompleteInstallationPage } from './pages/CompleteInstallationPage'
import { CustomerAlertsPage } from './pages/CustomerAlertsPage'
import { CustomerEnergyPage } from './pages/CustomerEnergyPage'
import { CustomerHomePage } from './pages/CustomerHomePage'
import { CustomerProfilePage } from './pages/CustomerProfilePage'
import { CustomerReportsPage } from './pages/CustomerReportsPage'
import { CustomerDetailPage } from './pages/CustomerDetailPage'
import { CustomersPage } from './pages/CustomersPage'
import { InstallationCreatedPage } from './pages/InstallationCreatedPage'
import { InstallationActivatedPage } from './pages/InstallationActivatedPage'
import { InstallationDetailPage } from './pages/InstallationDetailPage'
import { InstallationsPage } from './pages/InstallationsPage'
import { MvpJourneyPage } from './pages/MvpJourneyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'
import { ProductRoadmapPage } from './pages/ProductRoadmapPage'
import { SiteDetailPage } from './pages/SiteDetailPage'
import { TechnicianJobDetailPage } from './pages/TechnicianJobDetailPage'
import { TechnicianPortalPage } from './pages/TechnicianPortalPage'

export default function App() {
  return (
    <Routes>
      <Route path="customer" element={<CustomerAppLayout />}>
        <Route index element={<CustomerHomePage />} />
        <Route path="energy" element={<CustomerEnergyPage />} />
        <Route path="alerts" element={<CustomerAlertsPage />} />
        <Route path="reports" element={<CustomerReportsPage />} />
        <Route path="profile" element={<CustomerProfilePage />} />
      </Route>
      <Route element={<PresentationLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="mvp-journey" element={<MvpJourneyPage />} />
        <Route path="technician" element={<TechnicianPortalPage />} />
        <Route path="technician/jobs/:installationId" element={<TechnicianJobDetailPage />} />
        <Route path="technician/jobs/:installationId/complete" element={<CompleteInstallationPage />} />
        <Route path="roadmap" element={<ProductRoadmapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/new" element={<AddCustomerPage />} />
        <Route path="customers/:customerId" element={<CustomerDetailPage />} />
        <Route path="installations" element={<InstallationsPage />} />
        <Route path="installations/new" element={<AddInstallationPage />} />
        <Route path="installations/:installationId/created" element={<InstallationCreatedPage />} />
        <Route path="installations/:installationId/activated" element={<InstallationActivatedPage />} />
        <Route path="installations/:installationId" element={<InstallationDetailPage />} />
        <Route path="sites/:siteId" element={<SiteDetailPage />} />
        <Route path=":module" element={<AdminModulePage />} />
      </Route>
    </Routes>
  )
}
