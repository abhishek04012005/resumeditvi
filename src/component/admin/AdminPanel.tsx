"use client";

import { useState, useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { ContactUsStorage } from "@/supabase/ContactSupabase";
import { EnquiryPopupStorage } from "@/supabase/EnquiryPopup";
import { AdminAuthStorage } from "@/supabase/AdminAuth";

interface ContactMessage {
  id: number;
  name: string;
  mobile: string;
  message: string;
  status?: string;
  created_at: string;
}

const AdminPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<'enquiry' | 'contact'>('enquiry');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [updateLoadingId, setUpdateLoadingId] = useState<number | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchMessages();
    }
  }, [isLoggedIn, tab]);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (tab === 'contact') {
        const contactData = await ContactUsStorage.getAllContactUs();
        setMessages(
          contactData.map((item) => ({
            id: item.id,
            name: item.name,
            mobile: item.mobile,
            message: item.message,
            status: item.status,
            created_at: item.created_at,
          }))
        );
        setInfo('Loaded contact messages from Supabase.');
      } else {
        const enquiryData = await EnquiryPopupStorage.getAllEnquiries();
        setMessages(
          enquiryData.map((item) => ({
            id: item.id,
            name: item.name,
            mobile: item.mobile_number,
            message: item.service,
            status: item.status,
            created_at: item.created_at,
          }))
        );
        setInfo('Loaded enquiry requests from Supabase.');
      }
    } catch (err) {
      setError('Unable to load messages.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setError(null);
    setInfo(null);
    if (!username || !password) {
      setError('Enter both username and password.');
      return;
    }

    try {
      setIsLoading(true);
      const admin = await AdminAuthStorage.authenticateAdmin(username, password);
      if (!admin) {
        setError('Invalid admin credentials.');
        return;
      }
      setIsLoggedIn(true);
    } catch (err) {
      setError('Login failed.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessages([]);
  };

  const handleStatusChange = async (id: number, status: string) => {
    setUpdateLoadingId(id);
    setError(null);
    try {
      if (tab === 'contact') {
        await ContactUsStorage.updateContactStatus(id, status);
      } else {
        await EnquiryPopupStorage.updateEnquiryStatus(id, status);
      }
      fetchMessages();
      setInfo(`Updated ${tab} status successfully.`);
    } catch (err) {
      setError('Unable to update status.');
    } finally {
      setUpdateLoadingId(null);
    }
  };

  return (
    <main className={styles.adminPage}>
      <div className={styles.adminCard}>
        <div className={styles.adminHeader}>
          <div>
            <h1 className={styles.adminTitle}>Admin Dashboard</h1>
            <p className={styles.adminSubtitle}>
              Use the enquiry and contact dashboard to manage incoming messages with the global theme color palette.
            </p>
          </div>
          {isLoggedIn && (
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {!isLoggedIn ? (
          <div className={styles.loginForm}>
            {error && <div className={styles.errorBox}>{error}</div>}
            {info && <div className={styles.infoBox}>{info}</div>}
            <div className={styles.loginField}>
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin username"
              />
            </div>
            <div className={styles.loginField}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin password"
              />
            </div>
            <div className={styles.loginActions}>
              <button className={styles.loginButton} onClick={handleLogin}>
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
              <small>Admin credentials are stored in Supabase and matched on login.</small>
            </div>
          </div>
        ) : (
          <div className={styles.panelBody}>
            {error && <div className={styles.errorBox}>{error}</div>}
            {info && <div className={styles.infoBox}>{info}</div>}

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Messages</div>
                <div className={styles.statValue}>{messages.length}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Active Tab</div>
                <div className={styles.statValue}>{tab === 'enquiry' ? 'Enquiry' : 'Contact'}</div>
              </div>
            </div>

            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${tab === 'enquiry' ? 'active' : ''}`}
                onClick={() => setTab('enquiry')}
                type="button"
              >
                Enquiry
              </button>
              <button
                className={`${styles.tabButton} ${tab === 'contact' ? 'active' : ''}`}
                onClick={() => setTab('contact')}
                type="button"
              >
                Contact
              </button>
            </div>

            <div className={styles.tableWrapper}>
              <div className={styles.tableHeader}>
                <h3>{tab === 'enquiry' ? 'Enquiry Requests' : 'Contact Messages'}</h3>
                <button className={styles.actionButton} onClick={fetchMessages}>
                  Refresh
                </button>
              </div>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>{tab === 'enquiry' ? 'Service' : 'Message'}</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Call</th>
                    <th>WhatsApp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length > 0 ? (
                    messages.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.mobile}</td>
                        <td className={styles.breakText}>{item.message}</td>
                        <td>{item.status ?? 'New'}</td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                        <td>
                          <a
                            href={`tel:+91${item.mobile}`}
                            className={styles.callButton}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Call
                          </a>
                        </td>
                        <td>
                          <a
                            href={`https://wa.me/91${item.mobile}?text=${encodeURIComponent(
                              `Hi ${item.name}, regarding your ${tab === 'enquiry' ? 'enquiry' : 'message'}: ${item.message}`
                            )}`}
                            className={styles.whatsappButton}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            WhatsApp
                          </a>
                        </td>
                        <td>
                          <select
                            value={item.status ?? 'New'}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            disabled={updateLoadingId === item.id}
                          >
                            <option value="New">New</option>
                            <option value="In Progress">Spam</option>
                            <option value="Resolved">No Resposne</option>
                            <option value="Closed">Progress</option>
                            <option value="Complete">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} style={{ padding: '24px', textAlign: 'center' }}>
                        {isLoading ? 'Loading...' : 'No records found.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPanel;
