# Glowee Financial Dashboard

Professional financial dashboard for tracking revenue, costs, and profitability metrics with monthly filtering and detailed cost breakdown.

## Features

✨ **Key Features:**
- 📊 Real-time financial metrics from Google Sheets
- 📈 Interactive charts (revenue, costs, profit, margins)
- 📋 Monthly financial comparison table
- 🔍 Detailed monthly filtering with cost breakdown
- 💰 Comprehensive cost analysis:
  - COGS (Cost of Goods Sold)
  - Logistics
  - Marketing (Performance, Salaries, Other)
  - Team Salaries
  - Software & Services
  - Web Development
  - Accounting
  - Other expenses
- 📊 Visual cost breakdown using pie charts
- 🎨 Dark theme with glassmorphism design
- 📱 Fully responsive design

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Charts:** Chart.js library
- **Backend:** Node.js with native HTTP module
- **Data Source:** Google Sheets (CSV export)
- **Styling:** Dark theme with gradient backgrounds

## Installation

### Prerequisites
- Node.js v14+ installed
- Internet connection for Google Sheets access

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Glowee-Financial-Dashboard.git
cd Glowee-Financial-Dashboard
```

2. Start the server:
```bash
node server.js
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Dashboard Features

**1. Monthly Filter**
- Select "Všechny měsíce" to see year-to-date overview
- Choose specific month to view detailed breakdown

**2. KPI Cards**
- Total Revenue
- Total Costs
- Total Profit
- Average Margin %

**3. Interactive Charts**
- Revenue Trend (VO vs MO)
- Costs Trend (Stacked bar chart)
- Profit Trend
- Margin Analysis
- Combined Comparison

**4. Monthly Breakdown**
When a specific month is selected, view:
- Revenue breakdown (VO, MO)
- Detailed cost breakdown (11 categories)
- Cost distribution pie chart
- Month-specific metrics

**5. Monthly Comparison Table**
- All months with revenue, costs, and profit
- Color-coded profit (green/red)
- Margin percentage calculations

## Data Structure

The dashboard expects Google Sheets with the following rows:
```
Revenue:
- Tržby VO
- Tržby MO

Costs:
- Náklady na prodané zboží VO
- Náklady na prodané zboží MO
- Logistika
- Perf. marketing
- Mktg mzdy
- Ostatní marketing
- Mzda Šimon
- Software
- Web Development
- Účetnictví
- Jiné náklady

Metrics:
- VH (Profit)
- % marže VO
- % marže MO
```

Columns should be in format: `MM/YYYY` (e.g., 01/2025, 02/2025, etc.)

## Configuration

### Change Data Source

Edit `dashboard.html` line ~365:
```javascript
const CSV_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv';
```

### Server Configuration

Edit `server.js` to change the port (default: 3000):
```javascript
const PORT = 3000; // Change this value
```

## Deployment

### Using Vercel (Recommended for frontend only)
```bash
npm install -g vercel
vercel
```

### Using Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Using traditional hosting
1. Upload `dashboard.html` and `server.js` to your server
2. Install Node.js on the server
3. Run: `node server.js`
4. Configure your web server to proxy requests to Node.js

## Troubleshooting

**Dashboard shows "Chyba při načítání dat"**
- Check internet connection
- Verify Google Sheets is accessible
- Check browser console for errors (F12)
- Ensure CSV format is correct

**Charts not displaying**
- Verify Chart.js CDN is accessible
- Check that data is loaded (look for data in console)
- Clear browser cache and reload

**Port 3000 already in use**
- Change port in `server.js`
- Or kill existing process: `lsof -ti:3000 | xargs kill -9`

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for commercial purposes.

## Author

Simon Drapela - Glowee
- Email: simon@glowee.cz

## Contributing

Feel free to submit issues and enhancement requests!

## Changelog

### v1.0.0 (Current)
- Initial release
- Monthly filtering with cost breakdown
- Full cost accounting (11 categories)
- Interactive charts and visualizations
- Responsive design
- Dark theme interface
