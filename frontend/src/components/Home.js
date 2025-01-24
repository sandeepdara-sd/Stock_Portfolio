import React from 'react';
import {
  ThemeProvider, createTheme, CssBaseline,  Typography, Button, 
  Container, Grid, Card, CardContent, Box,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.02em'
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em'
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em'
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em'
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#2D3250',
      dark: '#1A1F3A',
      light: '#424869'
    },
    secondary: {
      main: '#F9B17A',
      dark: '#E89559',
      light: '#FFC59B'
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2D3250',
      secondary: '#677294'
    },
    success: {
      main: '#34D399'
    },
    error: {
      main: '#F87171'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(15, 23, 42, 0.08)',
    '0px 2px 4px rgba(15, 23, 42, 0.08)',
    '0px 4px 8px rgba(15, 23, 42, 0.08)',
    '0px 8px 16px rgba(15, 23, 42, 0.08)',
    '0px 16px 24px rgba(15, 23, 42, 0.08)',
    '0px 20px 32px rgba(15, 23, 42, 0.08)',
    ...Array(17).fill('none')
  ]
});

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Real-Time Tracking',
    description: 'Monitor your investments in real-time with advanced tracking tools.'
  },
  {
    url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Portfolio Analytics',
    description: 'Get deep insights into your investment performance.'
  },
  {
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Market Analysis',
    description: 'Stay ahead with comprehensive market analysis tools.'
  },
  {
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&h=800&q=80',
    title: 'Smart Alerts',
    description: 'Never miss an important market movement with intelligent notifications.'
  }
];

const features = [
  {
    icon: <ShowChartIcon sx={{ fontSize: 48 }} />,
    title: 'Real-Time Tracking',
    description: 'Monitor your investments in real-time with advanced tracking tools and analytics.'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 48 }} />,
    title: 'Secure Platform',
    description: 'Bank-grade security to keep your investment data safe and protected.'
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 48 }} />,
    title: 'Advanced Analytics',
    description: 'Powerful analytics tools to help you make informed investment decisions.'
  },
  {
    icon: <NotificationsActiveIcon sx={{ fontSize: 48 }} />,
    title: 'Smart Alerts',
    description: 'Get instant notifications about important market movements and portfolio changes.'
  },
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 48 }} />,
    title: 'Portfolio Optimization',
    description: 'AI-powered suggestions to optimize your portfolio performance.'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
    title: 'Market Insights',
    description: 'Access detailed market insights and expert recommendations.'
  }
];



function Home() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ 
        pt: { xs: 12, md: 20 }, 
        pb: { xs: 10, md: 16 }, 
        background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography 
                  variant="h1" 
                  gutterBottom
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    lineHeight: 1.1,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    mb: 3
                  }}
                >
                  Smart Investment Portfolio Management
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 5, 
                    lineHeight: 1.6,
                    textShadow: '0 1px 8px rgba(0,0,0,0.1)',
                    fontWeight: 500
                  }}
                >
                  Track, analyze, and optimize your investments with our powerful portfolio management tools.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<TrendingUpIcon />}
                    sx={{ 
                      px: 4,
                      py: 2,
                      bgcolor: 'white', 
                      color: 'primary.main',
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 14px rgba(255,255,255,0.4)',
                      '&:hover': { 
                        bgcolor: 'grey.100',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 6px 20px rgba(255,255,255,0.6)'
                      }
                    }}
                    LinkComponent={Link}
                    to='/signup'
                  >
                    Get Started Free
                  </Button>
                  {/* <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 2,
                      color: 'white', 
                      borderColor: 'white',
                      borderWidth: 2,
                      fontSize: '1.1rem',
                      backdropFilter: 'blur(4px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': { 
                        borderColor: 'white', 
                        borderWidth: 2,
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    Learn More
                  </Button> */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}>
                <Swiper
                  modules={[Autoplay, EffectFade, Pagination]}
                  effect="fade"
                  spaceBetween={0}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  loop={true}
                  style={{
                    '--swiper-pagination-color': '#F9B17A',
                    '--swiper-pagination-bullet-inactive-color': '#ffffff',
                    '--swiper-pagination-bullet-inactive-opacity': '0.5',
                    '--swiper-pagination-bullet-size': '10px',
                    '--swiper-pagination-bullet-horizontal-gap': '6px'
                  }}
                >
                  {carouselImages.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={slide.url}
                          alt={slide.title}
                          sx={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                          }}
                        />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(45, 50, 80, 0.9), transparent)',
                          p: 3,
                          color: 'white',
                        }}>
                          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                            {slide.title}
                          </Typography>
                          <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            {slide.description}
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 16 } }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Why Choose StockFolio
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary" 
          sx={{ 
            mb: 8,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 500
          }}
        >
          Everything you need to manage your investments in one place
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                '&:hover': { 
                  transform: 'translateY(-12px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main'
                }
              }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4
                }}>
                  <Box sx={{ 
                    color: 'primary.main', 
                    mb: 3,
                    transform: 'scale(1)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                      transform: 'scale(1.1) rotate(5deg)'
                    }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      color: 'text.primary'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '1.05rem'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Market Insights Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Market Insights
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
          >
            Stay ahead with real-time market data and advanced analytics
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <BarChartIcon sx={{ fontSize: 40 }} />,
                title: 'Market Performance',
                value: '+2.4%',
                trend: 'up',
                description: 'S&P 500 Index today'
              },
              {
                icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
                title: 'Trading Volume',
                value: '1.2B',
                trend: 'up',
                description: 'Shares traded today'
              },
              {
                icon: <QueryStatsIcon sx={{ fontSize: 40 }} />,
                title: 'Market Volatility',
                value: '15.2',
                trend: 'down',
                description: 'VIX Index'
              }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 3,
                      color: 'primary.main'
                    }}>
                      {stat.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ ml: 2, fontWeight: 600 }}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 1,
                        fontWeight: 700,
                        color: stat.trend === 'up' ? 'success.main' : 'error.main'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Card sx={{ 
              p: 4,
              background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
              color: 'white',
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                Get Real-Time Market Updates
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Subscribe to our premium plan for advanced market insights and real-time alerts
              </Typography>
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Upgrade to Premium
              </Button>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 16 } }}>
        <Container maxWidth="md">
          <Card sx={{ 
            p: { xs: 4, md: 8 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #2D3250 0%, #424869 100%)',
            color: 'white',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(45, 50, 80, 0.3)'
          }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Start Investing Smarter?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 500 }}>
              Join thousands of investors who trust StockFolio for their portfolio management
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                LinkComponent={Link}
                to='/signup'
                sx={{ 
                  px: 4,
                  py: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(255,255,255,0.4)'
                  }
                }}
              >
                Get Started Free
              </Button>
              {/* <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  px: 4,
                  py: 2,
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Learn More
              </Button> */}
            </Box>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Home;