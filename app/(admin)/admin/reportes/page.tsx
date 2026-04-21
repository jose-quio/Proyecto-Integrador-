"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Reportes y Análisis</h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ingresos Totales (Marzo)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#d4663a]">$12,450</div>
            <p className="text-xs text-green-600">+8% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Reservas Confirmadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#d4663a]">87</div>
            <p className="text-xs text-gray-500">Total: 128 reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ocupación Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#d4663a]">68%</div>
            <p className="text-xs text-yellow-600">-2% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Nuevos Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#d4663a]">23</div>
            <p className="text-xs text-green-600">+12% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs con diferentes reportes */}
      <Tabs defaultValue="tours" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tours">Tours Populares</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos por Mes</TabsTrigger>
          <TabsTrigger value="estados">Reservas por Estado</TabsTrigger>
        </TabsList>

        <TabsContent value="tours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Tours más reservados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tour</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Ocupación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Aventura en Machu Picchu</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>$14,700</TableCell>
                    <TableCell>85%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Islas Galápagos Express</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>$21,600</TableCell>
                    <TableCell>75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City Tour Lima</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>$675</TableCell>
                    <TableCell>50%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingresos">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos mensuales (USD)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Reservas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Enero 2025</TableCell>
                    <TableCell>$8,200</TableCell>
                    <TableCell>32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Febrero 2025</TableCell>
                    <TableCell>$11,500</TableCell>
                    <TableCell>45</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marzo 2025</TableCell>
                    <TableCell>$12,450</TableCell>
                    <TableCell>51</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estados">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Reservas por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Confirmadas</span>
                  <Badge className="bg-green-100 text-green-800">87 (68%)</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pendientes</span>
                  <Badge className="bg-yellow-100 text-yellow-800">24 (19%)</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Canceladas</span>
                  <Badge className="bg-red-100 text-red-800">17 (13%)</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}