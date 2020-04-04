import React from 'react'
import {Link} from "gatsby"
import Img from "gatsby-image"
import {Card, Text, Button} from "@theme-ui/components"

export default function ProjectCard ({imgData, name, description = "", link}) {
  return (
    <Card>
      <Img fluid={imgData} />
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Link to={link}><Button>View details</Button></Link>
    </Card>
  )
}