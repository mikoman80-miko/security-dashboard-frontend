import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = () => {
    setLogs([]); 
    setTimeout(() => {
      const fakeApiData = [
        { id: 1, time: "11:20:05", ip: "192.168.0.10", risk: "high", riskLabel: "위험", status: "차단됨" },
        { id: 2, time: "11:22:15", ip: "10.0.0.5", risk: "low", riskLabel: "주의", status: "분석중" },
        { id: 3, time: "11:25:30", ip: "172.16.0.120", risk: "high", riskLabel: "위험", status: "차단됨" },
        { id: 4, time: "11:28:42", ip: "192.168.1.55", risk: "low", riskLabel: "주의", status: "모니터링" }
      ];
      setLogs(fakeApiData);
    }, 500);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // --- [여기서부터 새로 추가된 부분] ---
  // 데이터를 분석해서 요약 정보를 자동으로 계산합니다.
  const totalLogs = logs.length; // 전체 로그 개수
  const highRiskCount = logs.filter(log => log.risk === 'high').length; // 위험(high)인 것만 걸러내서 개수 세기
  const blockedCount = logs.filter(log => log.status === '차단됨').length; // 차단된 것만 세기
  // ------------------------------------

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>보안 관제 대시보드</h1>
      </header>
      <main className="main-content">
        
        {/* --- [여기서부터 새로 추가된 부분] 요약 카드 HTML --- */}
        <div className="summary-cards">
          <div className="card">
            <h3>총 로그 수</h3>
            <p>{totalLogs} 건</p>
          </div>
          <div className="card warning">
            <h3>위험 경고</h3>
            <p>{highRiskCount} 건</p>
          </div>
          <div className="card">
            <h3>차단 완료</h3>
            <p>{blockedCount} 건</p>
          </div>
        </div>
        {/* ------------------------------------------------ */}

        <div className="title-area">
          <h2>실시간 보안 로그</h2>
          <button className="refresh-btn" onClick={fetchLogs}>
            데이터 새로고침
          </button>
        </div>
        
        <table className="security-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>발생 시간</th>
              <th>출발지 IP</th>
              <th>위험도</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.time}</td>
                <td>{log.ip}</td>
                <td>
                  <span className={`badge ${log.risk}`}>{log.riskLabel}</span>
                </td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </main>
    </div>
  );
}

export default App;