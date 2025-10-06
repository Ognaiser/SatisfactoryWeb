import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Paper,
  Divider
} from '@mui/material'
import {
  Build,
  Code,
  Web,
  Storage,
  Router,
  CheckCircle,
  Palette,
  Info as InfoIcon
} from '@mui/icons-material'

const technologies = [
  { name: 'Vite', icon: <Build />, desc: 'Fast build tool and dev server' },
  { name: 'TypeScript', icon: <Code />, desc: 'Type-safe JavaScript' },
  { name: 'React', icon: <Web />, desc: 'UI component library' },
  { name: 'Redux Toolkit', icon: <Storage />, desc: 'State management' },
  { name: 'React Router', icon: <Router />, desc: 'Client-side routing' },
  { name: 'ESLint', icon: <CheckCircle />, desc: 'Code quality linting' },
  { name: 'Prettier', icon: <Palette />, desc: 'Code formatting' },
  { name: 'Material-UI', icon: <Palette />, desc: 'Design system & components' }
]

export default function About() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <InfoIcon sx={{ mr: 2, fontSize: '2rem' }} />
        <Typography variant="h3" component="h1">
          About This Project
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Project Overview
              </Typography>
              
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>

              <Typography variant="body1" paragraph>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Features & Capabilities
              </Typography>
              
              <Typography variant="body1" paragraph>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Technology Stack
              </Typography>
              
              <List dense>
                {technologies.map((tech) => (
                  <ListItem key={tech.name} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {tech.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={tech.name}
                      secondary={tech.desc}
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Typography variant="body2" paragraph>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
              quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam 
              quaerat voluptatem.
            </Typography>
            <Typography variant="body2">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure 
              reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}