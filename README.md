# 📈 Stock Price Prediction Platform

A modern web application for stock market analysis and price prediction using machine learning. Built with React, TypeScript, and Shadcn/UI.


## Features

- **Real-time Stock Data** - Live quotes and historical data visualization
- **ML Predictions** - SVR-powered price forecasting
- **Interactive Charts** - Dynamic charts with multiple timeframes
- **Smart Search** - Autocomplete stock search functionality
- **Multi-currency** - Support for different currencies
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Theme switching with system preference

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd stock_Price_Predict

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1, TypeScript 5.5.3, Vite 5.4.1
- **UI**: Tailwind CSS, Shadcn/UI, Radix UI, Lucide React
- **Data**: TanStack Query, React Hook Form, Zod
- **Charts**: Recharts, Date-fns

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── ui/             # Shadcn/UI components
│   ├── StockChart.tsx  # Chart component
│   └── StockSearch.tsx # Search component
├── services/           # API services
├── pages/              # App pages
├── hooks/              # Custom hooks
└── lib/                # Utilities
```


## 📊 ML Features

- **SVR Algorithm** - Support Vector Regression for price prediction
- **Performance Metrics** - Accuracy scores and error analysis
- **Trend Analysis** - Short and long-term trend identification
- **Confidence Intervals** - Prediction uncertainty ranges

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

---

**Built with ❤️ for financial technology**