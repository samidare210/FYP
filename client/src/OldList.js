<List disablePadding>
{['Home', 'Message Log', 'Robot Status', 'Remote Control'].map((text, index) => (
  <ListItem key={text} disablePadding sx={{ display: 'block' }}>
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2,
      }}
    >
      <ListItemIcon>
        {/* First line icon is HomeIcon,second line icon is InboxIcon,third line icon is SettingsIcon and the forth icon is ControlCameraIcon */}
        {index % 4 === 0 ? <HomeIcon /> : index % 4 === 1 ? <InboxIcon /> : index % 4 === 2 ? <SettingsIcon /> : <ControlCameraIcon />}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
))}
</List>