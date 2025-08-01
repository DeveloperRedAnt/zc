# API Error Codes dan Messages (Range 1601-1800)

## Authentication & Authorization Errors (1601-1620)

```json
{
  "data": {
    "message": "Authentication required"
  },
  "error_code": 1601
}
```

```json
{
  "data": {
    "message": "Invalid authentication token"
  },
  "error_code": 1602
}
```

```json
{
  "data": {
    "message": "Token expired"
  },
  "error_code": 1603
}
```

```json
{
  "data": {
    "message": "Access denied"
  },
  "error_code": 1604
}
```

```json
{
  "data": {
    "message": "Insufficient permissions"
  },
  "error_code": 1605
}
```

```json
{
  "data": {
    "message": "Invalid API key"
  },
  "error_code": 1606
}
```

```json
{
  "data": {
    "message": "API key expired"
  },
  "error_code": 1607
}
```

```json
{
  "data": {
    "message": "Session expired"
  },
  "error_code": 1608
}
```

```json
{
  "data": {
    "message": "Invalid refresh token"
  },
  "error_code": 1609
}
```

```json
{
  "data": {
    "message": "Account locked"
  },
  "error_code": 1610
}
```

```json
{
  "data": {
    "message": "Account disabled"
  },
  "error_code": 1611
}
```

```json
{
  "data": {
    "message": "Two-factor authentication required"
  },
  "error_code": 1612
}
```

```json
{
  "data": {
    "message": "Invalid two-factor code"
  },
  "error_code": 1613
}
```

```json
{
  "data": {
    "message": "Permission denied for resource"
  },
  "error_code": 1614
}
```

```json
{
  "data": {
    "message": "Role not authorized"
  },
  "error_code": 1615
}
```

```json
{
  "data": {
    "message": "IP address blocked"
  },
  "error_code": 1616
}
```

```json
{
  "data": {
    "message": "Geographic restriction"
  },
  "error_code": 1617
}
```

```json
{
  "data": {
    "message": "Authentication method not supported"
  },
  "error_code": 1618
}
```

```json
{
  "data": {
    "message": "Invalid credentials"
  },
  "error_code": 1619
}
```

```json
{
  "data": {
    "message": "Maximum login attempts exceeded"
  },
  "error_code": 1620
}
```

## Request Validation Errors (1621-1650)

```json
{
  "data": {
    "message": "Invalid request format"
  },
  "error_code": 1621
}
```

```json
{
  "data": {
    "message": "Missing required field"
  },
  "error_code": 1622
}
```

```json
{
  "data": {
    "message": "Invalid field format"
  },
  "error_code": 1623
}
```

```json
{
  "data": {
    "message": "Field value too long"
  },
  "error_code": 1624
}
```

```json
{
  "data": {
    "message": "Field value too short"
  },
  "error_code": 1625
}
```

```json
{
  "data": {
    "message": "Invalid email format"
  },
  "error_code": 1626
}
```

```json
{
  "data": {
    "message": "Invalid phone number format"
  },
  "error_code": 1627
}
```

```json
{
  "data": {
    "message": "Invalid date format"
  },
  "error_code": 1628
}
```

```json
{
  "data": {
    "message": "Invalid UUID format"
  },
  "error_code": 1629
}
```

```json
{
  "data": {
    "message": "Invalid JSON format"
  },
  "error_code": 1630
}
```

```json
{
  "data": {
    "message": "Invalid content type"
  },
  "error_code": 1631
}
```

```json
{
  "data": {
    "message": "Request body too large"
  },
  "error_code": 1632
}
```

```json
{
  "data": {
    "message": "Invalid URL format"
  },
  "error_code": 1633
}
```

```json
{
  "data": {
    "message": "Invalid numeric value"
  },
  "error_code": 1634
}
```

```json
{
  "data": {
    "message": "Value out of range"
  },
  "error_code": 1635
}
```

```json
{
  "data": {
    "message": "Invalid boolean value"
  },
  "error_code": 1636
}
```

```json
{
  "data": {
    "message": "Invalid array format"
  },
  "error_code": 1637
}
```

```json
{
  "data": {
    "message": "Array size exceeded"
  },
  "error_code": 1638
}
```

```json
{
  "data": {
    "message": "Invalid object structure"
  },
  "error_code": 1639
}
```

```json
{
  "data": {
    "message": "Missing required header"
  },
  "error_code": 1640
}
```

```json
{
  "data": {
    "message": "Invalid header value"
  },
  "error_code": 1641
}
```

```json
{
  "data": {
    "message": "Unsupported HTTP method"
  },
  "error_code": 1642
}
```

```json
{
  "data": {
    "message": "Invalid query parameter"
  },
  "error_code": 1643
}
```

```json
{
  "data": {
    "message": "Malformed request"
  },
  "error_code": 1644
}
```

```json
{
  "data": {
    "message": "Invalid character encoding"
  },
  "error_code": 1645
}
```

```json
{
  "data": {
    "message": "Field validation failed"
  },
  "error_code": 1646
}
```

```json
{
  "data": {
    "message": "Constraint violation"
  },
  "error_code": 1647
}
```

```json
{
  "data": {
    "message": "Invalid enum value"
  },
  "error_code": 1648
}
```

```json
{
  "data": {
    "message": "Pattern matching failed"
  },
  "error_code": 1649
}
```

```json
{
  "data": {
    "message": "Custom validation failed"
  },
  "error_code": 1650
}
```

## GET Method Errors (1651-1670)

```json
{
  "data": {
    "message": "Resource not found"
  },
  "error_code": 1651
}
```

```json
{
  "data": {
    "message": "Composites not found"
  },
  "error_code": 1652
}
```

```json
{
  "data": {
    "message": "Invalid query parameters"
  },
  "error_code": 1653
}
```

```json
{
  "data": {
    "message": "Invalid pagination parameters"
  },
  "error_code": 1654
}
```

```json
{
  "data": {
    "message": "Invalid sort parameters"
  },
  "error_code": 1655
}
```

```json
{
  "data": {
    "message": "Invalid filter parameters"
  },
  "error_code": 1656
}
```

```json
{
  "data": {
    "message": "Data access forbidden"
  },
  "error_code": 1657
}
```

```json
{
  "data": {
    "message": "Resource access expired"
  },
  "error_code": 1658
}
```

```json
{
  "data": {
    "message": "Query result too large"
  },
  "error_code": 1659
}
```

```json
{
  "data": {
    "message": "Invalid search query"
  },
  "error_code": 1660
}
```

```json
{
  "data": {
    "message": "Search index unavailable"
  },
  "error_code": 1661
}
```

```json
{
  "data": {
    "message": "Invalid date range"
  },
  "error_code": 1662
}
```

```json
{
  "data": {
    "message": "Resource temporarily unavailable"
  },
  "error_code": 1663
}
```

```json
{
  "data": {
    "message": "Cache miss error"
  },
  "error_code": 1664
}
```

```json
{
  "data": {
    "message": "Data retrieval timeout"
  },
  "error_code": 1665
}
```

```json
{
  "data": {
    "message": "Invalid resource ID"
  },
  "error_code": 1666
}
```

```json
{
  "data": {
    "message": "Resource moved permanently"
  },
  "error_code": 1667
}
```

```json
{
  "data": {
    "message": "Resource archived"
  },
  "error_code": 1668
}
```

```json
{
  "data": {
    "message": "Invalid accept header"
  },
  "error_code": 1669
}
```

```json
{
  "data": {
    "message": "Data format not supported"
  },
  "error_code": 1670
}
```

## POST Method Errors (1671-1700)

```json
{
  "data": {
    "message": "Resource creation failed"
  },
  "error_code": 1671
}
```

```json
{
  "data": {
    "message": "Duplicate resource"
  },
  "error_code": 1672
}
```

```json
{
  "data": {
    "message": "Invalid request body"
  },
  "error_code": 1673
}
```

```json
{
  "data": {
    "message": "Resource quota exceeded"
  },
  "error_code": 1674
}
```

```json
{
  "data": {
    "message": "Invalid file format"
  },
  "error_code": 1675
}
```

```json
{
  "data": {
    "message": "File size too large"
  },
  "error_code": 1676
}
```

```json
{
  "data": {
    "message": "Resource dependency not found"
  },
  "error_code": 1677
}
```

```json
{
  "data": {
    "message": "Business rule violation"
  },
  "error_code": 1678
}
```

```json
{
  "data": {
    "message": "Resource locked"
  },
  "error_code": 1679
}
```

```json
{
  "data": {
    "message": "Invalid foreign key reference"
  },
  "error_code": 1680
}
```

```json
{
  "data": {
    "message": "Resource already exists"
  },
  "error_code": 1681
}
```

```json
{
  "data": {
    "message": "Creation not allowed"
  },
  "error_code": 1682
}
```

```json
{
  "data": {
    "message": "Invalid parent resource"
  },
  "error_code": 1683
}
```

```json
{
  "data": {
    "message": "Resource limit reached"
  },
  "error_code": 1684
}
```

```json
{
  "data": {
    "message": "Unique constraint violation"
  },
  "error_code": 1685
}
```

```json
{
  "data": {
    "message": "Invalid resource state"
  },
  "error_code": 1686
}
```

```json
{
  "data": {
    "message": "Resource initialization failed"
  },
  "error_code": 1687
}
```

```json
{
  "data": {
    "message": "Circular dependency detected"
  },
  "error_code": 1688
}
```

```json
{
  "data": {
    "message": "Invalid configuration"
  },
  "error_code": 1689
}
```

```json
{
  "data": {
    "message": "Resource type mismatch"
  },
  "error_code": 1690
}
```

```json
{
  "data": {
    "message": "Creation requires approval"
  },
  "error_code": 1691
}
```

```json
{
  "data": {
    "message": "Invalid timestamp"
  },
  "error_code": 1692
}
```

```json
{
  "data": {
    "message": "Resource creation timeout"
  },
  "error_code": 1693
}
```

```json
{
  "data": {
    "message": "Invalid resource version"
  },
  "error_code": 1694
}
```

```json
{
  "data": {
    "message": "Resource template not found"
  },
  "error_code": 1695
}
```

```json
{
  "data": {
    "message": "Creation queue full"
  },
  "error_code": 1696
}
```

```json
{
  "data": {
    "message": "Invalid metadata"
  },
  "error_code": 1697
}
```

```json
{
  "data": {
    "message": "Resource name conflict"
  },
  "error_code": 1698
}
```

```json
{
  "data": {
    "message": "Invalid resource priority"
  },
  "error_code": 1699
}
```

```json
{
  "data": {
    "message": "Resource creation rollback failed"
  },
  "error_code": 1700
}
```

## PUT Method Errors (1701-1730)

```json
{
  "data": {
    "message": "Resource update failed"
  },
  "error_code": 1701
}
```

```json
{
  "data": {
    "message": "Resource not found for update"
  },
  "error_code": 1702
}
```

```json
{
  "data": {
    "message": "Version conflict"
  },
  "error_code": 1703
}
```

```json
{
  "data": {
    "message": "Resource is read-only"
  },
  "error_code": 1704
}
```

```json
{
  "data": {
    "message": "Update not allowed"
  },
  "error_code": 1705
}
```

```json
{
  "data": {
    "message": "Invalid update data"
  },
  "error_code": 1706
}
```

```json
{
  "data": {
    "message": "Resource state conflict"
  },
  "error_code": 1707
}
```

```json
{
  "data": {
    "message": "Concurrent modification detected"
  },
  "error_code": 1708
}
```

```json
{
  "data": {
    "message": "Resource is being processed"
  },
  "error_code": 1709
}
```

```json
{
  "data": {
    "message": "Update requires full replacement"
  },
  "error_code": 1710
}
```

```json
{
  "data": {
    "message": "Invalid update sequence"
  },
  "error_code": 1711
}
```

```json
{
  "data": {
    "message": "Update validation failed"
  },
  "error_code": 1712
}
```

```json
{
  "data": {
    "message": "Resource locked for update"
  },
  "error_code": 1713
}
```

```json
{
  "data": {
    "message": "Update timeout"
  },
  "error_code": 1714
}
```

```json
{
  "data": {
    "message": "Invalid update target"
  },
  "error_code": 1715
}
```

```json
{
  "data": {
    "message": "Update rollback failed"
  },
  "error_code": 1716
}
```

```json
{
  "data": {
    "message": "Resource update queue full"
  },
  "error_code": 1717
}
```

```json
{
  "data": {
    "message": "Update requires restart"
  },
  "error_code": 1718
}
```

```json
{
  "data": {
    "message": "Invalid update permissions"
  },
  "error_code": 1719
}
```

```json
{
  "data": {
    "message": "Update dependency failed"
  },
  "error_code": 1720
}
```

```json
{
  "data": {
    "message": "Resource update conflict"
  },
  "error_code": 1721
}
```

```json
{
  "data": {
    "message": "Update requires approval"
  },
  "error_code": 1722
}
```

```json
{
  "data": {
    "message": "Update transaction failed"
  },
  "error_code": 1723
}
```

```json
{
  "data": {
    "message": "Resource update disabled"
  },
  "error_code": 1724
}
```

```json
{
  "data": {
    "message": "Update checkpoint failed"
  },
  "error_code": 1725
}
```

```json
{
  "data": {
    "message": "Invalid update schedule"
  },
  "error_code": 1726
}
```

```json
{
  "data": {
    "message": "Update history limit exceeded"
  },
  "error_code": 1727
}
```

```json
{
  "data": {
    "message": "Resource update paused"
  },
  "error_code": 1728
}
```

```json
{
  "data": {
    "message": "Update metadata invalid"
  },
  "error_code": 1729
}
```

```json
{
  "data": {
    "message": "Update integrity check failed"
  },
  "error_code": 1730
}
```

## PATCH Method Errors (1731-1750)

```json
{
  "data": {
    "message": "Partial update failed"
  },
  "error_code": 1731
}
```

```json
{
  "data": {
    "message": "Invalid patch format"
  },
  "error_code": 1732
}
```

```json
{
  "data": {
    "message": "Patch operation not supported"
  },
  "error_code": 1733
}
```

```json
{
  "data": {
    "message": "Field cannot be modified"
  },
  "error_code": 1734
}
```

```json
{
  "data": {
    "message": "Invalid patch path"
  },
  "error_code": 1735
}
```

```json
{
  "data": {
    "message": "Patch validation failed"
  },
  "error_code": 1736
}
```

```json
{
  "data": {
    "message": "Patch conflict detected"
  },
  "error_code": 1737
}
```

```json
{
  "data": {
    "message": "Patch operation denied"
  },
  "error_code": 1738
}
```

```json
{
  "data": {
    "message": "Invalid patch value"
  },
  "error_code": 1739
}
```

```json
{
  "data": {
    "message": "Patch sequence error"
  },
  "error_code": 1740
}
```

```json
{
  "data": {
    "message": "Patch target not found"
  },
  "error_code": 1741
}
```

```json
{
  "data": {
    "message": "Patch operation timeout"
  },
  "error_code": 1742
}
```

```json
{
  "data": {
    "message": "Invalid patch operation"
  },
  "error_code": 1743
}
```

```json
{
  "data": {
    "message": "Patch rollback failed"
  },
  "error_code": 1744
}
```

```json
{
  "data": {
    "message": "Patch dependency failed"
  },
  "error_code": 1745
}
```

```json
{
  "data": {
    "message": "Patch size exceeded"
  },
  "error_code": 1746
}
```

```json
{
  "data": {
    "message": "Patch format not supported"
  },
  "error_code": 1747
}
```

```json
{
  "data": {
    "message": "Patch test failed"
  },
  "error_code": 1748
}
```

```json
{
  "data": {
    "message": "Patch application failed"
  },
  "error_code": 1749
}
```

```json
{
  "data": {
    "message": "Patch version mismatch"
  },
  "error_code": 1750
}
```

## DELETE Method Errors (1751-1770)

```json
{
  "data": {
    "message": "Resource deletion failed"
  },
  "error_code": 1751
}
```

```json
{
  "data": {
    "message": "Resource not found for deletion"
  },
  "error_code": 1752
}
```

```json
{
  "data": {
    "message": "Resource has dependencies"
  },
  "error_code": 1753
}
```

```json
{
  "data": {
    "message": "Deletion not allowed"
  },
  "error_code": 1754
}
```

```json
{
  "data": {
    "message": "Resource is protected"
  },
  "error_code": 1755
}
```

```json
{
  "data": {
    "message": "Soft delete failed"
  },
  "error_code": 1756
}
```

```json
{
  "data": {
    "message": "Resource already deleted"
  },
  "error_code": 1757
}
```

```json
{
  "data": {
    "message": "Cascade deletion failed"
  },
  "error_code": 1758
}
```

```json
{
  "data": {
    "message": "Resource is in use"
  },
  "error_code": 1759
}
```

```json
{
  "data": {
    "message": "Deletion requires confirmation"
  },
  "error_code": 1760
}
```

```json
{
  "data": {
    "message": "Deletion timeout"
  },
  "error_code": 1761
}
```

```json
{
  "data": {
    "message": "Invalid deletion target"
  },
  "error_code": 1762
}
```

```json
{
  "data": {
    "message": "Deletion rollback failed"
  },
  "error_code": 1763
}
```

```json
{
  "data": {
    "message": "Resource deletion locked"
  },
  "error_code": 1764
}
```

```json
{
  "data": {
    "message": "Deletion queue full"
  },
  "error_code": 1765
}
```

```json
{
  "data": {
    "message": "Deletion requires approval"
  },
  "error_code": 1766
}
```

```json
{
  "data": {
    "message": "Deletion transaction failed"
  },
  "error_code": 1767
}
```

```json
{
  "data": {
    "message": "Resource deletion disabled"
  },
  "error_code": 1768
}
```

```json
{
  "data": {
    "message": "Deletion audit failed"
  },
  "error_code": 1769
}
```

```json
{
  "data": {
    "message": "Deletion integrity check failed"
  },
  "error_code": 1770
}
```

## BATCH Method Errors (1771-1790)

```json
{
  "data": {
    "message": "Batch operation failed"
  },
  "error_code": 1771
}
```

```json
{
  "data": {
    "message": "Invalid batch format"
  },
  "error_code": 1772
}
```

```json
{
  "data": {
    "message": "Batch size exceeded"
  },
  "error_code": 1773
}
```

```json
{
  "data": {
    "message": "Partial batch failure"
  },
  "error_code": 1774
}
```

```json
{
  "data": {
    "message": "Batch operation timeout"
  },
  "error_code": 1775
}
```

```json
{
  "data": {
    "message": "Invalid batch operation"
  },
  "error_code": 1776
}
```

```json
{
  "data": {
    "message": "Batch transaction failed"
  },
  "error_code": 1777
}
```

```json
{
  "data": {
    "message": "Batch validation failed"
  },
  "error_code": 1778
}
```

```json
{
  "data": {
    "message": "Mixed batch operations not allowed"
  },
  "error_code": 1779
}
```

```json
{
  "data": {
    "message": "Batch processing queue full"
  },
  "error_code": 1780
}
```

```json
{
  "data": {
    "message": "Batch operation denied"
  },
  "error_code": 1781
}
```

```json
{
  "data": {
    "message": "Batch rollback failed"
  },
  "error_code": 1782
}
```

```json
{
  "data": {
    "message": "Batch dependency failed"
  },
  "error_code": 1783
}
```

```json
{
  "data": {
    "message": "Batch sequence error"
  },
  "error_code": 1784
}
```

```json
{
  "data": {
    "message": "Batch operation cancelled"
  },
  "error_code": 1785
}
```

```json
{
  "data": {
    "message": "Batch limit exceeded"
  },
  "error_code": 1786
}
```

```json
{
  "data": {
    "message": "Batch operation paused"
  },
  "error_code": 1787
}
```

```json
{
  "data": {
    "message": "Batch integrity check failed"
  },
  "error_code": 1788
}
```

```json
{
  "data": {
    "message": "Batch operation locked"
  },
  "error_code": 1789
}
```

```json
{
  "data": {
    "message": "Batch operation requires approval"
  },
  "error_code": 1790
}
```

## Server & System Errors (1791-1800)

```json
{
  "data": {
    "message": "Internal server error"
  },
  "error_code": 1791
}
```

```json
{
  "data": {
    "message": "Database connection failed"
  },
  "error_code": 1792
}
```

```json
{
  "data": {
    "message": "Service temporarily unavailable"
  },
  "error_code": 1793
}
```

```json
{
  "data": {
    "message": "Request timeout"
  },
  "error_code": 1794
}
```

```json
{
  "data": {
    "message": "Rate limit exceeded"
  },
  "error_code": 1795
}
```

```json
{
  "data": {
    "message": "Maintenance mode"
  },
  "error_code": 1796
}
```

```json
{
  "data": {
    "message": "System overload"
  },
  "error_code": 1797
}
```

```json
{
  "data": {
    "message": "Configuration error"
  },
  "error_code": 1798
}
```

```json
{
  "data": {
    "message": "Service dependency failed"
  },
  "error_code": 1799
}
```

```json
{
  "data": {
    "message": "System initialization failed"
  },
  "error_code": 1800
}
```

## Pembagian Error Codes (1601-1800)

### Struktur Range:
- **1601-1620**: Authentication & Authorization (20 codes)
- **1621-1650**: Request Validation (30 codes)
- **1651-1670**: GET Method (20 codes)
- **1671-1700**: POST Method (30 codes)
- **1701-1730**: PUT Method (30 codes)
- **1731-1750**: PATCH Method (20 codes)
- **1751-1770**: DELETE Method (20 codes)
- **1771-1790**: BATCH Method (20 codes)
- **1791-1800**: Server & System (10 codes)

### Total: 200 Error Codes