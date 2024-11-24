import { Box, Typography } from "@mui/material";

import { Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard/CategoryCard";

const Section = ({ title, title1, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor, padding: '40px' }}>
      <Box>
        <Typography variant="h2" align="center" sx={{ fontWeight: 900, color: '#f3780b', mb: 2 }}>{title}</Typography>
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bolder', color: '#e3dad3', wordSpacing: 5, textTransform: 'uppercase', fontSize: 24, mb: 4 }}>{title1}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {productItems.map((productItem) => (
            <CategoryCard
              key={productItem.id}
              title={title}
              productItem={productItem}
            />
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default Section;
